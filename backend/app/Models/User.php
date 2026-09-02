<?php

namespace App\Models;

use App\Enums\UserStatus;
use App\Mail\QueuedResetPasswordEmail;
use App\Mail\QueuedVerifyEmail;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'first_name',
    'last_name',
    'email',
    'password',
])]
#[Hidden([
    'password',
    'remember_token'
])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => UserStatus::class,
        ];
    }

    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new QueuedVerifyEmail());
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new QueuedResetPasswordEmail($token));
    }

    public function ownedWebsites(): HasMany
    {
        return $this->hasMany(Website::class, 'owner_id');
    }

    public function operators(): HasMany
    {
        return $this->hasMany(Operator::class);
    }

    public function sentOperatorInvitations(): HasMany
    {
        return $this->hasMany(OperatorInvitation::class, 'invited_by_user_id');
    }

    public function acceptedOperatorInvitations(): HasMany
    {
        return $this->hasMany(OperatorInvitation::class, 'accepted_by_user_id');
    }

    public function operatedWebsites(): BelongsToMany
    {
        return $this->belongsToMany(Website::class, 'operators', 'user_id', 'website_id')
            ->withPivot(['id', 'role_id', 'status'])
            ->withTimestamps();
    }

    public function messages(): MorphMany
    {
        return $this->morphMany(Message::class, 'sender');
    }
}
