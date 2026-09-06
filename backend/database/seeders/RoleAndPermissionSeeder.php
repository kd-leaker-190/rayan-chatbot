<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'websites' => [
                'index' => [
                    'name' => 'مشاهده لیست وبسایت‌ها',
                    'slug' => 'websites.index',
                    'description' => 'قابلیت مشاهده تمام وبسایت‌های ساخته‌شده در داشبورد',
                ],
                'show' => [
                    'name' => 'مشاهده اطلاعات وبسایت',
                    'slug' => 'websites.show',
                    'description' => 'قابلیت مشاهده اطلاعات وبسایت‌های ساخته‌شده در داشبورد',
                ],
                'store' => [
                    'name' => 'ایجاد وبسایت',
                    'slug' => 'websites.store',
                    'description' => 'قابلیت ایجاد وبسایت در داشبورد',
                ],
                'update' => [
                    'name' => 'ویرایش اطلاعات وبسایت',
                    'slug' => 'websites.update',
                    'description' => 'قابلیت ویرایش اطلاعات وبسایت در داشبورد',
                ],
                'destroy' => [
                    'name' => 'حذف وبسایت',
                    'slug' => 'websites.destroy',
                    'description' => 'قابلیت حذف وبسایت در داشبورد',
                ],
            ],
        ];
        $roles = [
            'website-manager' => [
                'name' => 'مدیر وبسایت‌ها',
                'slug' => 'website-manager',
                'description' => 'قابلیت مدیریت تمام امکانات بخش وبسایت‌ها در داشبورد',
                'permissions' => [
                    'websites.index',
                    'websites.show',
                    'websites.store',
                    'websites.update',
                    'websites.destroy',
                ],
            ],
        ];

        foreach ($permissions as $actions) {
            foreach ($actions as $permissionData) {
                Permission::updateOrCreate(
                    [
                        'slug' => $permissionData['slug'],
                    ],
                    [
                        'name' => $permissionData['name'],
                        'description' => $permissionData['description'] ?? null,
                    ]
                );
            }
        }

        foreach ($roles as $roleData) {
            $role = Role::updateOrCreate(
                [
                    'website_id' => null,
                    'slug' => $roleData['slug'],
                ],
                [
                    'name' => $roleData['name'],
                    'description' => $roleData['description'] ?? null,
                ]
            );

            $permissionIds = Permission::query()
                ->whereIn('slug', $roleData['permissions'])
                ->pluck('id');

            $role->permissions()->sync($permissionIds);
        }
    }
}
