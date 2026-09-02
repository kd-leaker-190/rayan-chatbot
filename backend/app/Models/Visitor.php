<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'first_name',
    'last_name',
    'email',
])]
class Visitor extends Model
{
    public function conversations(): HasMany
    {
        return $this->hasMany(Conversation::class);
    }
}
