<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Card extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'position', 'task_list_id'];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function booted()
    {
        static::creating(function ($card) {
            $card->id = $card->id ?? Str::uuid()->toString();
        });
    }

    public function list()
    {
        return $this->belongsTo(TaskList::class); // or List::class depending on your naming
    }
}
