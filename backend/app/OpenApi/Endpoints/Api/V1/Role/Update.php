<?php

namespace App\OpenApi\Endpoints\Api\V1\Role;

use OpenApi\Attributes as OA;

#[OA\Put(
    path: "/api/v1/websites/{website}/roles/{role}",
    description: "Update a role",
    summary: "Update a role if you are owner or operator with defined-role",
    requestBody: new OA\RequestBody(
        description: "Role object that needs to be updated",
        required: true,
        content: new OA\JsonContent(
            required: ["name", "permission_ids"],
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
                    example: [1, 2, 3, 4, 5],
                    nullable: true
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
        new OA\Parameter(
            name: "role",
            description: "Role ID",
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
            response: 200,
            description: "Successful operation",
            content: new OA\JsonContent(
                ref: "#/components/schemas/WebsiteResponse"
            )
        ),
        new OA\Response(
            response: 422,
            description: "Validation error"
        )
    ]
)]
class Update
{
    //
}
