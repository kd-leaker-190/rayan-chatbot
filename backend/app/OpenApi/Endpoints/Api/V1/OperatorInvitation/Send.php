<?php

namespace App\OpenApi\Endpoints\Api\V1\OperatorInvitation;

use OpenApi\Attributes as OA;

#[OA\Post(
    path: "/api/v1/websites/{website}/operator-invitations/send",
    description: "Store and send invitation email to user",
    summary: "Send invitation email to user",
    requestBody: new OA\RequestBody(
        description: "OperatorInvitation object that needs to be stored",
        required: true,
        content: new OA\JsonContent(
            required: ["role_id", "first_name", "last_name", "email"],
            properties: [
                new OA\Property(property: "role_id", type: "string", example: 1),
                new OA\Property(property: "first_name", type: "string", example: "John"),
                new OA\Property(property: "last_name", type: "string", example: "Doe"),
                new OA\Property(property: 'email', type: 'email', example: 'john@example.com')
            ]
        )
    ),
    tags: ["OperatorInvitation"],
    parameters: [
        new OA\Parameter(
            name: "website",
            description: "Website ID",
            in: "path",
            required: true,
            schema: new OA\Schema(
                type: "integer",
                example: 1
            )
        ),
    ],
    responses: [
        new OA\Response(
            response: 201,
            description: "Successful operation - Record created",
            content: new OA\JsonContent(
                ref: "#/components/schemas/OperatorInvitationResponse"
            )
        ),
        new OA\Response(
            response: 422,
            description: "Validation error"
        )
    ]
)]
class Send
{
    //
}
