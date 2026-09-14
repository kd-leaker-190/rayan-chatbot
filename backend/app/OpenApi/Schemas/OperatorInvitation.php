<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "OperatorInvitation",
    title: "OperatorInvitation",
    description: "OperatorInvitation model",
    required: ["role_id", "first_name", "last_name", "email"],
    properties: [
        new OA\Property(
            property: "id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "website_id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "invited_by_user_id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "accepted_by_user_id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "first_name",
            type: "string",
            example: "John"
        ),
        new OA\Property(
            property: "last_name",
            type: "string",
            example: "Doe"
        ),
        new OA\Property(
            property: "email",
            type: "email",
            example: "john@example.com"
        ),
        new OA\Property(
            property: "status",
            type: "string",
            example: "active"
        ),
        new OA\Property(
            property: "created_at",
            type: "string",
            format: "date-time",
            example: "2026-08-26 9:17:20"
        ),
        new OA\Property(
            property: "updated_at",
            type: "string",
            format: "date-time",
            example: "2026-08-26 9:17:20"
        )
    ]
)]
class OperatorInvitation
{
    //
}
