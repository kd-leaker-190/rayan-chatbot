<?php

namespace App\OpenApi\Endpoints\Api\V1\Role;

use OpenApi\Attributes as OA;

#[OA\Get(
    path: "/api/v1/websites/{website}/roles",
    description: "Returns websites roles list",
    summary: "Get owners websites and websites the user has been operated in roles",
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
            response: 200,
            description: "Successful operation",
            content: new OA\JsonContent(
                ref: "#/components/schemas/RoleResponse"
            )
        ),
        new OA\Response(
            response: 401,
            description: "Unauthenticated"
        )
    ],
)]
class Index
{

}
