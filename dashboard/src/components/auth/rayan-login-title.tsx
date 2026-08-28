import chatbotImage from "@/assets/images/chatbot.png"

export default function RayanLoginTitle() {
  return (
    <div className="mb-8 flex items-center justify-center gap-2 md:justify-start">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 p-1.5">
        <img
          src={chatbotImage}
          alt="آیکون رایان چت"
          className="h-full w-full object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">رایان چت</h1>
    </div>
  )
}
