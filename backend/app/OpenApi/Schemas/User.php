<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "User",
    title: "User",
    description: "User model",
    required: ["first_name", "last_name", "email", "password"],
    properties: [
        new OA\Property(
            property: "id",
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
            type: "string",
            format: "email",
            example: "john@example.com"
        ),
        new OA\Property(
            property: "email_verified_at",
            type: "string",
            format: "date-time",
            example: "2026-08-26 9:17:20"
        ),
        new OA\Property(
            property: "password",
            type: "string",
            format: "password",
            example: "password"
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
class User
{
    //
}
