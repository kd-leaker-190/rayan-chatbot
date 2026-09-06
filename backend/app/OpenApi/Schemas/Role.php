<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "Role",
    title: "Role",
    description: "Role model",
    required: ["name", "slug"],
    properties: [
        new OA\Property(
            property: "id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "website_id",
            type: "integer",
            example: 1
        ),
        new OA\Property(
            property: "name",
            type: "string",
            example: "مدیریت وبسایت"
        ),
        new OA\Property(
            property: "slug",
            type: "string",
            example: "modiriat-website"
        ),
        new OA\Property(
            property: "description",
            type: "string",
            example: "قابلیت مدیریت وبسایت های داشبورد"
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
class Role
{
    //
}
