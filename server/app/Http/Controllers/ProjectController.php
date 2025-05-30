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
            'projects' => Auth::user()->projects()->orderBy('updated_at', 'desc')->get()
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
}
