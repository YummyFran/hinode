<?php 

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
