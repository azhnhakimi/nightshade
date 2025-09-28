<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name',
        'details',
        'priority',
        'space',
        'due_date',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',   
    ];
}
