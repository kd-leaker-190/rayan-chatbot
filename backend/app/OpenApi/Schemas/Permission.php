<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "Permission",
    title: "Permission",
    description: "Permission model",
    required: ["name", "slug"],
    properties: [
        new OA\Property(
            property: "id",
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
            example: "create-website"
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
class Permission
{
    //
}
