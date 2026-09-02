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
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'first_name',
    'last_name',
    'email',
    'password',
    'status',
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

    public function websites(): HasMany
    {
        return $this->hasMany(Website::class);
    }

    public function operators(): HasMany
    {
        return $this->hasMany(Operator::class);
    }
}
