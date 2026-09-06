<?php

namespace App\OpenApi\Endpoints\Api\V1\Website;

use OpenApi\Attributes as OA;

#[OA\Put(
    path: "/api/v1/websites/{website}",
    description: "Update a website",
    summary: "Update a website if you are owner or operator with defined-role",
    requestBody: new OA\RequestBody(
        description: "Website object that needs to be updated",
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
