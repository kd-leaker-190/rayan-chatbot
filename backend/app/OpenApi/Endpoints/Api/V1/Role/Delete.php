<?php

namespace App\OpenApi\Endpoints\Api\V1\Role;

use OpenApi\Attributes as OA;

#[OA\Delete(
    path: "/api/v1/websites/{website}/roles/{role}",
    description: "Delete a website data",
    summary: "Delete website data",
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
            response: 401,
            description: "Unauthenticated"
        )
    ],
)]
class Delete
{

}
