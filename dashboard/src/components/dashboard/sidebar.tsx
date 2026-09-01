import { LayoutDashboard, BotIcon, X } from "lucide-react"

import NavItem from "@/components/dashboard/nav-item"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-64 flex-col bg-[#0f2018] p-4 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"} `}
      >
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-green-500 font-bold">
              <BotIcon className="size-5" />
            </div>
            <span className="text-lg font-semibold">رایان چت</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="mt-4 space-y-1" onClick={() => onClose()}>
          <NavItem
            icon={<LayoutDashboard className="size-4" />}
            label="داشبورد"
            active
            link="/dashboard"
          />
        </nav>
      </aside>
    </>
  )
}
