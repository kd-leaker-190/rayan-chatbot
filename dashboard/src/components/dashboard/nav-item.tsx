import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"

export default function NavItem({
  icon,
  label,
  link,
  active,
  badge,
}: {
  icon: React.ReactNode
  label: string
  link: string
  active?: boolean
  badge?: number
}) {
  return (
    <Link
      to={link}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
        active
          ? "bg-green-600 text-white"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge className="rounded-full bg-green-500 text-white hover:bg-green-500">
          {badge}
        </Badge>
      )}
    </Link>
  )
}
