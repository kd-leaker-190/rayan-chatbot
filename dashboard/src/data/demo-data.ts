import { Bot, Clock, MessageSquare, Users } from "lucide-react"

export const stats = [
  {
    title: "کل چت ها",
    value: "124",
    change: "+12%",
    up: true,
    icon: MessageSquare,
  },
  {
    title: "پاسخ های هوش مصنوعی",
    value: "89",
    change: "+16%",
    up: true,
    icon: Bot,
  },
  {
    title: "چت های اوپراتورها",
    value: "35",
    change: "+7%",
    up: true,
    icon: Users,
  },
  {
    title: "میانگین زمان پاسخگویی",
    value: "1.8 دقیقه",
    change: "-32%",
    up: false,
    icon: Clock,
  },
]

export const recentChats = [
  {
    id: 1,
    name: "شکیب زیدی",
    msg: "سلام، سفارش من کی ارسال میشه؟",
    time: "2 دقیقه پیش",
  },
  {
    id: 2,
    name: "شکیب زیدی",
    msg: "بله، دقیقاً همین موضوع رو می‌خوام...",
    time: "12 دقیقه پیش",
  },
  {
    id: 3,
    name: "شکیب زیدی",
    msg: "ممنون از کمکتون 🙏",
    time: "28 دقیقه پیش",
  },
  {
    id: 4,
    name: "شکیب زیدی",
    msg: "لطفاً فاکتور سفارش رو بفرستید",
    time: "1 ساعت پیش",
  },
]
