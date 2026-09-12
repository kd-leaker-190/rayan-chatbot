<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

#[Fillable([
    'website_id',
    'name',
    'slug',
    'description',
])]
class Role extends Model
{
    protected static function booted(): void
    {
        static::saving(function (self $role) {
            if (blank($role->slug)) {
                $role->slug = static::makeUniqueSlug($role->name, $role->id);
            }
        });
    }

    public static function makeUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $slug = Str::slug(static::toLatin($name));

        if ($slug === '') {
            $slug = 'role';
        }

        $base = $slug;
        $i = 1;

        while (static::query()->where('slug', $slug)->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $i++;
            $slug = $base . '-' . $i;
        }

        return $slug;
    }

    protected static function toLatin(string $value): string
    {
        $map = [
            'ا' => 'a', 'آ' => 'a', 'ب' => 'b', 'پ' => 'p', 'ت' => 't', 'ث' => 's',
            'ج' => 'j', 'چ' => 'ch', 'ح' => 'h', 'خ' => 'kh', 'د' => 'd', 'ذ' => 'z',
            'ر' => 'r', 'ز' => 'z', 'ژ' => 'j', 'س' => 's', 'ش' => 'sh', 'ص' => 's',
            'ض' => 'z', 'ط' => 't', 'ظ' => 'z', 'ع' => 'a', 'غ' => 'gh', 'ف' => 'f',
            'ق' => 'gh', 'ک' => 'k', 'گ' => 'g', 'ل' => 'l', 'م' => 'm', 'ن' => 'n',
            'و' => 'v', 'ه' => 'h', 'ی' => 'y', 'ي' => 'y', 'ك' => 'k',
        ];

        return strtr($value, $map);
    }

    public function scopeGlobal($query)
    {
        return $query->whereNull('website_id');
    }

    public function scopeOwner($query)
    {
        return $query
            ->whereNull('website_id')
            ->where('slug', 'owner');
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            Permission::class,
            'role_permissions',
            'role_id',
            'permission_id'
        );
    }

    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }

    public function operators(): HasMany
    {
        return $this->hasMany(Operator::class);
    }
}
