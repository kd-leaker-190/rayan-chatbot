<?php

namespace App\OpenApi\Endpoints\Api\V1\Role;

use OpenApi\Attributes as OA;

#[OA\Post(
    path: "/api/v1/websites/{website}/roles",
    description: "Store a new role for website",
    summary: "Store a new website role if you are owner or operator with defined-role",
    requestBody: new OA\RequestBody(
        description: "Role object that needs to be stored",
        required: true,
        content: new OA\JsonContent(
            required: ["name", 'permission_ids'],
            properties: [
                new OA\Property(property: "name", type: "string", example: "مدیریت وبسایت"),
                new OA\Property(property: "description", type: "string", example: "modiriat-website"),
                new OA\Property(
                    property: "permission_ids",
                    type: "array",
                    items: new OA\Items(
                        type: "integer",
                        example: 1
                    ),
                    example: [1, 2, 3, 4, 5]
                ),
            ]
        )
    ),
    tags: ["Role"],
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
                ref: "#/components/schemas/RoleResponse"
            )
        ),
        new OA\Response(
            response: 422,
            description: "Validation error"
        )
    ]
)]
class Store
{
    //
}
