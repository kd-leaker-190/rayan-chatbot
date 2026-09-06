<?php

namespace App\OpenApi\Endpoints\Api\V1\Website;

use OpenApi\Attributes as OA;

#[OA\Get(
    path: "/api/v1/websites",
    description: "Returns websites list",
    summary: "Get owners websites and websites the user has been operated in",
    tags: ["Website"],
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
    ]
)]
class Index
{

}
