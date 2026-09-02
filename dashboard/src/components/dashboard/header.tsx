import {
  Bell,
  CheckCircle2,
  Globe,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export default function Header({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (state: boolean) => void
}) {
  const { user, logout, userStatus } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 py-5 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6">
      {/* بخش سمت راست */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu className="size-5" />
        </button>

        <span className="text-base font-semibold text-foreground md:hidden">
          رایان چت
        </span>

        <div className="relative hidden w-64 md:block lg:w-80">
          <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو در چت‌ها، پیام‌ها..."
            className="h-9 w-full rounded-xl border border-input bg-muted/50 ps-9 pe-4 text-xs transition-colors placeholder:text-muted-foreground focus:border-green-500 focus:bg-background focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
          <kbd className="pointer-events-none absolute top-1/2 left-2.5 hidden -translate-y-1/2 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* بخش سمت چپ */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="پیام‌ها"
        >
          <Mail className="size-4.5" />
          <span className="absolute top-2 left-2 size-2 rounded-full bg-brand ring-2 ring-background" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="اعلانات"
        >
          <Bell className="size-4.5" />
          <span className="absolute top-2 left-2 size-2 rounded-full bg-rose-500 ring-2 ring-background" />
        </Button>

        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

        {/* منوی کاربر */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className="size-9 rounded-lg border border-input/60 shadow-xs focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="منوی حساب کاربری"
              >
                <User className="size-4.5 text-foreground" />
              </Button>
            }
          />

          <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-semibold text-foreground">
                    {user?.first_name + " " + user?.last_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer gap-2">
              <CheckCircle2 className="size-4 text-brand" />
              <span>وضعیت: {userStatus()}</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer gap-2">
              <User className="size-4 text-muted-foreground" />
              <span>پروفایل کاربری</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer gap-2">
              <Globe className="size-4 text-muted-foreground" />
              <span>مدیریت وب‌سایت‌ها</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer gap-2">
              <Shield className="size-4 text-muted-foreground" />
              <span>نقش‌ها و دسترسی‌ها</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer gap-2">
              <Settings className="size-4 text-muted-foreground" />
              <span>تنظیمات سیستم</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-2 text-rose-500 focus:bg-rose-50 focus:text-rose-600 dark:focus:bg-rose-950/40 dark:focus:text-rose-400"
            >
              <LogOut className="size-4" />
              <span>خروج از حساب</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
