<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'website_id',
    'external_id',
    'name',
    'email',
    'phone',
    'ip',
    'user_agent',
])]
class Visitor extends Model
{
    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(VisitorSession::class, 'visitor_id');
    }
}
