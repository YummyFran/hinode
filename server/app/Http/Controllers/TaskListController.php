<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\TaskList; 
use Illuminate\Support\Facades\Auth;

class TaskListController extends Controller
{
    public function index($projectId)
    {
        $project = Project::with(['lists' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])
        ->whereHas('users', fn ($q) => $q->where('users.id', Auth::id()))
        ->findOrFail($projectId);

        return response()->json([
            'success' => true,
            'lists' => $project->lists,
        ]);
    }

    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);

        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $list = $project->lists()->create([
            'title' => $request->title,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'List created successfully',
            'list' => $list
        ]);
    }
}
