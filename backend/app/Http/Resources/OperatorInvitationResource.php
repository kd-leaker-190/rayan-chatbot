<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OperatorInvitationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'website' => new WebsiteResource($this->whenLoaded('website')),
            'role' => new RoleResource($this->whenLoaded('role')),
            'invited_by' => new UserResource($this->whenLoaded('invitedBy')),
            'accepted_by' => new UserResource($this->whenLoaded('acceptedBy')),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'status' => $this->status?->value,
        ];
    }
}
