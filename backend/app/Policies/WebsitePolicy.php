<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Website;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\JsonResponse;

class WebsitePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Website $website): Response|JsonResponse
    {
        return $user->id === $website->owner_id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Website $website): Response
    {
        return $user->id === $website->owner_id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Website $website): Response
    {
        return $user->id === $website->owner_id
            ? Response::allow()
            : Response::denyAsNotFound(message: 'داده موردنظر یافت نشد.');
    }
}
