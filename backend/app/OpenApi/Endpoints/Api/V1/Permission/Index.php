<?php

namespace App\OpenApi\Endpoints\Api\V1\Permission;

use OpenApi\Attributes as OA;

#[OA\Get(
    path: "/api/v1/permissions",
    description: "Returns permissions list",
    summary: "Get all of the system permissions (just for viewing)",
    tags: ["Permission"],
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
