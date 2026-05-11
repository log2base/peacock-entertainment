<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'title',
        'image',
        'rating',
        'url',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'status'      => 'boolean',
        'is_featured' => 'boolean',
        'rating'      => 'float',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
