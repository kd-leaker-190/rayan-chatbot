import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Bell,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { title: "داشبورد", icon: LayoutDashboard, href: "#", isActive: true },
  { title: "آمار و تحلیل", icon: BarChart3, href: "#" },
  { title: "مشتریان", icon: Users, href: "#" },
  { title: "اعلان‌ها", icon: Bell, href: "#" },
  { title: "تنظیمات", icon: Settings, href: "#" },
  { title: "راهنما و پشتیبانی", icon: HelpCircle, href: "#" },
]

export default function AppSidebar({
  side = "right",
}: {
  side?: "left" | "right"
}) {
  return (
    <Sidebar side={side} collapsible="icon">
      {/* Brand Header */}
      <SidebarHeader className="border-b py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 text-right leading-tight">
                <span className="font-semibold">شرکت نمونه</span>
                <span className="text-xs text-muted-foreground">سازمانی</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>بخش کاربری</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    tooltip={item.title}
                    render={
                      <a href={item.href} className="gap-3">
                        <item.icon className="size-4 shrink-0" />
                        <span>{item.title}</span>
                      </a>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer Profile */}
      {/* User Footer Profile */}
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User avatar"
                      />
                      <AvatarFallback className="rounded-lg">
                        س‌م
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-right text-sm leading-tight">
                      <span className="truncate font-semibold">سارا محمدی</span>
                      <span className="truncate text-xs text-muted-foreground">
                        sara@example.com
                      </span>
                    </div>
                    <ChevronsUpDown className="ms-auto size-4" />
                  </SidebarMenuButton>
                }
              />

              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg text-right"
                side="top"
                align="start"
                sideOffset={4}
              >
                {/* مشخصات کاربر در بالای منو */}
                <div className="mb-1 flex items-center gap-2 border-b px-2 py-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback className="rounded-lg">س‌م</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-right text-sm leading-tight">
                    <span className="truncate font-semibold">سارا محمدی</span>
                    <span className="truncate text-xs text-muted-foreground">
                      sara@example.com
                    </span>
                  </div>
                </div>

                {/* آیتم‌های منو بدون DropdownMenuGroup اضافی */}
                <DropdownMenuItem className="cursor-pointer">
                  پروفایل کاربری
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  امور مالی و فاکتورها
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  تنظیمات
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  خروج از حساب
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
