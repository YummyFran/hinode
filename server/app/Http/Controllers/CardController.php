<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TaskList; 
use App\Models\Card; 

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
}
