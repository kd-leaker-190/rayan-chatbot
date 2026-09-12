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
            /*
            |--------------------------------------------------------------------------
            | Account / Website
            |--------------------------------------------------------------------------
            |
            | These permissions belong to the user's account context,
            | not to an operator inside a website.
            |
            */

            /*
            |--------------------------------------------------------------------------
            | Operators
            |--------------------------------------------------------------------------
            */

            'operators.index' => [
                'name' => 'مشاهده اپراتورها',
                'description' => 'قابلیت مشاهده لیست اپراتورهای وبسایت',
            ],

            'operators.show' => [
                'name' => 'مشاهده اپراتور',
                'description' => 'قابلیت مشاهده اطلاعات یک اپراتور',
            ],

            'operators.store' => [
                'name' => 'افزودن اپراتور',
                'description' => 'قابلیت دعوت و افزودن اپراتور جدید به وبسایت',
            ],

            'operators.update' => [
                'name' => 'ویرایش اپراتور',
                'description' => 'قابلیت ویرایش اطلاعات و وضعیت اپراتور',
            ],

            'operators.destroy' => [
                'name' => 'حذف اپراتور',
                'description' => 'قابلیت حذف اپراتور از وبسایت',
            ],

            /*
            |--------------------------------------------------------------------------
            | Roles
            |--------------------------------------------------------------------------
            */

            'roles.index' => [
                'name' => 'مشاهده نقش‌ها',
                'description' => 'قابلیت مشاهده نقش‌های وبسایت',
            ],

            'roles.show' => [
                'name' => 'مشاهده نقش',
                'description' => 'قابلیت مشاهده جزئیات یک نقش',
            ],

            'roles.store' => [
                'name' => 'ایجاد نقش',
                'description' => 'قابلیت ایجاد نقش سفارشی برای وبسایت',
            ],

            'roles.update' => [
                'name' => 'ویرایش نقش',
                'description' => 'قابلیت ویرایش نقش سفارشی وبسایت',
            ],

            'roles.destroy' => [
                'name' => 'حذف نقش',
                'description' => 'قابلیت حذف نقش سفارشی وبسایت',
            ],

            /*
            |--------------------------------------------------------------------------
            | Visitors
            |--------------------------------------------------------------------------
            */

            'visitors.index' => [
                'name' => 'مشاهده بازدیدکنندگان',
                'description' => 'قابلیت مشاهده لیست بازدیدکنندگان وبسایت',
            ],

            'visitors.show' => [
                'name' => 'مشاهده بازدیدکننده',
                'description' => 'قابلیت مشاهده اطلاعات بازدیدکننده',
            ],

            'visitors.update' => [
                'name' => 'ویرایش بازدیدکننده',
                'description' => 'قابلیت ویرایش اطلاعات بازدیدکننده',
            ],

            /*
            |--------------------------------------------------------------------------
            | Conversations
            |--------------------------------------------------------------------------
            */

            'conversations.index' => [
                'name' => 'مشاهده گفتگوها',
                'description' => 'قابلیت مشاهده لیست گفتگوهای وبسایت',
            ],

            'conversations.show' => [
                'name' => 'مشاهده گفتگو',
                'description' => 'قابلیت مشاهده جزئیات یک گفتگو',
            ],

            'conversations.accept' => [
                'name' => 'پذیرش گفتگو',
                'description' => 'قابلیت پذیرش یک گفتگوی جدید',
            ],

            'conversations.reject' => [
                'name' => 'رد گفتگو',
                'description' => 'قابلیت رد کردن یک گفتگوی جدید',
            ],

            'conversations.close' => [
                'name' => 'بستن گفتگو',
                'description' => 'قابلیت بستن یک گفتگوی فعال',
            ],

            /*
            |--------------------------------------------------------------------------
            | Messages
            |--------------------------------------------------------------------------
            */

            'messages.index' => [
                'name' => 'مشاهده پیام‌ها',
                'description' => 'قابلیت مشاهده پیام‌های گفتگو',
            ],

            'messages.show' => [
                'name' => 'مشاهده پیام',
                'description' => 'قابلیت مشاهده یک پیام',
            ],

            'messages.store' => [
                'name' => 'ارسال پیام',
                'description' => 'قابلیت ارسال پیام در گفتگو',
            ],

            'messages.update' => [
                'name' => 'ویرایش پیام',
                'description' => 'قابلیت ویرایش پیام',
            ],

            'messages.destroy' => [
                'name' => 'حذف پیام',
                'description' => 'قابلیت حذف پیام',
            ],
        ];

        foreach ($permissions as $slug => $permissionData) {
            Permission::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $permissionData['name'],
                    'description' => $permissionData['description'] ?? null,
                ]
            );
        }

        $roles = [
            /*
            |--------------------------------------------------------------------------
            | Owner
            |--------------------------------------------------------------------------
            */

            'owner' => [
                'name' => 'مالک وبسایت',
                'description' => 'دسترسی کامل به امکانات مدیریتی و عملیاتی وبسایت',
                'permissions' => [
                    'operators.index',
                    'operators.show',
                    'operators.store',
                    'operators.update',
                    'operators.destroy',

                    'roles.index',
                    'roles.show',
                    'roles.store',
                    'roles.update',
                    'roles.destroy',

                    'visitors.index',
                    'visitors.show',
                    'visitors.update',

                    'conversations.index',
                    'conversations.show',
                    'conversations.accept',
                    'conversations.reject',
                    'conversations.close',

                    'messages.index',
                    'messages.show',
                    'messages.store',
                    'messages.update',
                    'messages.destroy',
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Operator Admin
            |--------------------------------------------------------------------------
            */

            'operator-admin' => [
                'name' => 'مدیر اپراتورها',
                'description' => 'مدیریت اپراتورها و دسترسی‌های وبسایت',
                'permissions' => [
                    'operators.index',
                    'operators.show',
                    'operators.store',
                    'operators.update',
                    'operators.destroy',

                    'roles.index',
                    'roles.show',
                    'roles.store',
                    'roles.update',
                    'roles.destroy',

                    'visitors.index',
                    'visitors.show',

                    'conversations.index',
                    'conversations.show',
                    'conversations.accept',
                    'conversations.reject',
                    'conversations.close',

                    'messages.index',
                    'messages.show',
                    'messages.store',
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Operator
            |--------------------------------------------------------------------------
            */

            'operator' => [
                'name' => 'اپراتور',
                'description' => 'دسترسی استاندارد برای مدیریت گفتگو با بازدیدکنندگان',
                'permissions' => [
                    'visitors.index',
                    'visitors.show',

                    'conversations.index',
                    'conversations.show',
                    'conversations.accept',
                    'conversations.reject',
                    'conversations.close',

                    'messages.index',
                    'messages.show',
                    'messages.store',
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Support
            |--------------------------------------------------------------------------
            */

            'support' => [
                'name' => 'پشتیبان',
                'description' => 'دسترسی لازم برای پاسخگویی به بازدیدکنندگان',
                'permissions' => [
                    'visitors.index',
                    'visitors.show',

                    'conversations.index',
                    'conversations.show',
                    'conversations.accept',

                    'messages.index',
                    'messages.show',
                    'messages.store',
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Viewer
            |--------------------------------------------------------------------------
            */

            'viewer' => [
                'name' => 'مشاهده‌گر',
                'description' => 'دسترسی فقط برای مشاهده اطلاعات',
                'permissions' => [
                    'visitors.index',
                    'visitors.show',

                    'conversations.index',
                    'conversations.show',

                    'messages.index',
                    'messages.show',
                ],
            ],
        ];

        foreach ($roles as $slug => $roleData) {
            $role = Role::updateOrCreate(
                [
                    'website_id' => null,
                    'slug' => $slug,
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
