import { Menu, Search } from "lucide-react"

export default function Header({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (state: boolean) => void
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 py-5 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6">
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu className="size-5" />
        </button>

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

        <span className="text-lg font-semibold text-foreground md:hidden">
          رایان چت
        </span>
      </div>
    </header>
  )
}
