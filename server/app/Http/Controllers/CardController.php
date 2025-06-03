<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TaskList; 
use App\Models\Card; 
use Illuminate\Support\Facades\DB;

class CardController extends Controller
{
    public function index($listId)
    {
        $list = TaskList::with('cards')->findOrFail($listId);

        // Optional: Add user ownership verification via the parent project
        return response()->json([
            'success' => true,
            'cards' => $list->cards()->orderBy('position')->get(),
        ]);
    }

    public function store(Request $request, $listId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $list = TaskList::findOrFail($listId);

        $card = $list->cards()->create([
            'title' => $request->title,
            'description' => $request->description,
            'position' => $list->cards()->count() + 1,
        ]);

        return response()->json([
            'success' => true,
            'card' => $card
        ]);
    }

    public function moveCard(Request $request, $cardId)
    {
        $request->validate([
            'listId' => 'required|uuid|exists:task_lists,id',
            'position' => 'nullable|integer',
        ]);

        // Get card and new list
        $card = Card::findOrFail($cardId);
        $newList = TaskList::with('project')->findOrFail($request->listId);
        $project = $newList->project;

        // Check if authenticated user is a member of the project
        $isMember = DB::table('project_user')
            ->where('project_id', $project->id)
            ->where('user_id', Auth::id())
            ->exists();

        if (! $isMember) {
            return response()->json(['success' => false, 'message' => 'Unauthorized.'], 403);
        }

        // Move the card
        $card->task_list_id = $request->listId;

        if ($request->filled('position')) {
            $card->position = $request->position;
        } else {
            // Find the last position in the target task list
            $maxPosition = Card::where('task_list_id', $request->listId)->max('position');
            $card->position = $maxPosition ? $maxPosition + 1 : 1;
        }

        $card->save();

        return response()->json([
            'success' => true,
            'message' => 'Card moved successfully',
            'card' => $card
        ]);
    }

    public function destroy($cardId)
    {
        $card = Card::findOrFail($cardId);

        // Optional: Check if the authenticated user is a member of the project
        $project = $card->list->project ?? null;

        if ($project) {
            $isMember = DB::table('project_user')
                ->where('project_id', $project->id)
                ->where('user_id', Auth::id())
                ->exists();

            if (! $isMember) {
                return response()->json(['success' => false, 'message' => 'Unauthorized.'], 403);
            }
        }

        $card->delete();

        return response()->json([
            'success' => true,
            'message' => 'Card deleted successfully'
        ]);
    }

}
