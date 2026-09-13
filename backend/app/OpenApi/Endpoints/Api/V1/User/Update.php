<?php

namespace App\OpenApi\Endpoints\Api\V1\User;

use OpenApi\Attributes as OA;

#[OA\Put(
    path: "/api/v1/user",
    description: "Update authenticated user data",
    summary: "update authenticated user data",
    requestBody: new OA\RequestBody(
        description: "User data to update",
        required: true,
        content: new OA\JsonContent(
            required: ["first_name", "last_name", "email"],
            properties: [
                new OA\Property(property: "first_name", type: "string", example: "John"),
                new OA\Property(property: "last_name", type: "string", example: "Doe"),
                new OA\Property(property: "email", type: "email", example: "john@gmail.com"),
                new OA\Property(property: "password", type: "password", example: "password"),
                new OA\Property(property: "password_confirmation", type: "password", example: "password"),
            ]
        )
    ),
    tags: ["User"],
    responses: [
        new OA\Response(
            response: 200,
            description: "Successful operation",
            content: new OA\JsonContent(
                ref: "#/components/schemas/UserResponse"
            )
        ),
        new OA\Response(
            response: 401,
            description: "Unauthenticated"
        )
    ]
)]
class Update
{
    //
}
