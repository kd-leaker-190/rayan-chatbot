<?php

namespace App\Policies;

use App\Models\Operator;
use App\Models\User;
use App\Models\Website;
use Illuminate\Auth\Access\Response;

class OperatorPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Website $website): Response
    {
        return self::isOwner($user, $website) || $user->can('operators.index')
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Operator $operator, Website $website): Response
    {
        return self::belongsToWebsite($operator, $website) && (self::isOwner($user, $website) || $user->can('operators.show', $operator))
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Operator $operator, Website $website): Response
    {
        return self::belongsToWebsite($operator, $website) && (self::isOwner($user, $website) || $user->can('operators.update', $operator))
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Operator $operator, Website $website): Response
    {
        return self::belongsToWebsite($operator, $website) && (self::isOwner($user, $website) || $user->can('operators.delete', $operator))
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    public static function isOwner(User $user, Website $website): bool
    {
        return $user->id === $website->owner_id;
    }

    public static function belongsToWebsite(Operator $operator, Website $website): bool
    {
        return $operator->website_id === $website->id;
    }
}
