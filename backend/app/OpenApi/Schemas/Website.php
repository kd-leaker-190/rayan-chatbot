<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "Website",
    title: "Website",
    description: "Website model",
    required: ["title", "domain"],
    properties: [
        new OA\Property(
            property: "id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "owner_id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "title",
            type: "string",
            example: "Rayan Fanavari"
        ),
        new OA\Property(
            property: "domain",
            type: "string",
            example: "rayanfanavari.ir"
        ),
        new OA\Property(
            property: "status",
            type: "string",
            example: "active"
        ),
        new OA\Property(
            property: "created_at",
            type: "string",
            format: "date-time",
            example: "2026-08-26 9:17:20"
        ),
        new OA\Property(
            property: "updated_at",
            type: "string",
            format: "date-time",
            example: "2026-08-26 9:17:20"
        )
    ]
)]
class Website
{
    //
}
