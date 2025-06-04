<?php 

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProjectController extends Controller
{
    // Get all projects
    public function index()
    {
        return response()->json([
            'success' => true,
            'projects' => Project::with(['users' => function ($query) {
                $query->select('users.id', 'name') // add more fields as needed
                    ->withPivot('role', 'created_at', 'updated_at');
            }])
            ->whereHas('users', fn ($q) => $q->where('users.id', Auth::id()))
            ->orderBy('updated_at', 'desc')
            ->get()
        ], 200);
    }

    // Create a new project
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'total_tasks' => 0,
            'completed_tasks' => 0,
        ]); 

        $project->users()->attach(Auth::id(), ['role' => 'owner']);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully',
            'project' => $project
        ], 201);
    }

    public function show($id)
    {
        $project = Project::with([
            'users' => function ($query) {
                $query->select('users.id', 'name')
                    ->withPivot('role', 'created_at', 'updated_at');
            },
            'lists.cards' // Eager load cards inside each list
        ])
        ->whereHas('users', fn($q) => $q->where('users.id', Auth::id()))
        ->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Details for project " . $id,
            'project' => $project
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Ensure the authenticated user is the project owner
        $project = Project::whereHas('users', function ($q) {
                $q->where('users.id', Auth::id())
                ->where('role', 'owner');
            })
            ->findOrFail($id);

        // Update title and description
        $project->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully',
            'project' => $project,
        ]);
    }


    public function destroy($id)
    {
        $project = Project::whereHas('users', function ($q) {
                $q->where('users.id', Auth::id())
                ->where('role', 'owner'); 
            })
            ->findOrFail($id);

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }

    public function addMember(Request $request, $projectId)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Get the user by email
        $user = User::where('email', $request->email)->firstOrFail();

        // Only owners can add members
        $project = Project::whereHas('users', function ($q) {
            $q->where('users.id', Auth::id())
            ->where('role', 'owner');
        })->findOrFail($projectId);

        // Prevent adding the same user twice
        if ($project->users()->where('users.id', $user->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'User is already a member of this project.'
            ], 409);
        }

        $project->users()->attach($user->id, ['role' => 'member']);

        return response()->json([
            'success' => true,
            'message' => 'Member added successfully.',
            'user' => $user,
        ]);
    }

    public function removeMember(Request $request, $projectId, $userId)
    {
        $project = Project::whereHas('users', function ($q) {
                $q->where('users.id', Auth::id())
                ->where('role', 'owner'); // Only owners can remove members
            })
            ->findOrFail($projectId);

        if ($userId == Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot remove yourself as a member.'
            ], 400);
        }

        // Detach the user from the project
        $project->users()->detach($userId);

        return response()->json([
            'success' => true,
            'message' => 'Member removed successfully.'
        ]);
    }

}
