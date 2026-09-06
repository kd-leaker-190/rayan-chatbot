<?php

namespace App\OpenApi\Endpoints\Api\V1\Website;

use OpenApi\Attributes as OA;

#[OA\Post(
    path: "/api/v1/websites",
    description: "Store a new website",
    summary: "Store a new website if you are owner or operator with defined-role",
    requestBody: new OA\RequestBody(
        description: "Website object that needs to be stored",
        required: true,
        content: new OA\JsonContent(
            required: ["title", "domain"],
            properties: [
                new OA\Property(property: "title", type: "string", example: "Rayan Fanavari"),
                new OA\Property(property: "domain", type: "string", example: "rayanfanavari.ir")
            ]
        )
    ),
    tags: ["Website"],
    responses: [
        new OA\Response(
            response: 201,
            description: "Successful operation - Record created",
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
class Store
{
    //
}
