import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const data = [
  { day: "Mon", v: 45 },
  { day: "Tue", v: 70 },
  { day: "Wed", v: 95 },
  { day: "Thu", v: 80 },
  { day: "Fri", v: 110 },
  { day: "Sat", v: 90 },
  { day: "Sun", v: 125 },
]

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
        <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="v"
          stroke="#22c55e"
          strokeWidth={2.5}
          fill="url(#green)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
