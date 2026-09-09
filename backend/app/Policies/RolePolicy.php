<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use App\Models\Website;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Website $website): Response
    {
        return $user->id === $website->owner_id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Role $role, Website $website): Response
    {
        return $user->id === $website->owner_id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Website $website): Response
    {
        return $user->id === $website->owner_id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Role $role, Website $website): Response
    {
        return $user->id === $website->owner_id && $role->website_id === $website->id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Role $role, Website $website): Response
    {
        return $user->id === $website->owner_id && $role->website_id === $website->id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }
}
