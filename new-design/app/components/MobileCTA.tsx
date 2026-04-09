import { Phone, MessageCircle } from "lucide-react";

// Always visible on mobile at the bottom — no scroll condition
export function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex gap-3">
      <a
        href="tel:0901234567"
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 active:bg-blue-700 text-white rounded-2xl py-3.5 font-bold text-sm transition-colors min-h-[52px]"
      >
        <Phone className="w-4 h-4 shrink-0" />
        Gọi ngay
      </a>
      <a
        href="https://zalo.me/0901234567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-teal-500 active:bg-teal-600 text-white rounded-2xl py-3.5 font-bold text-sm transition-colors min-h-[52px]"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        Chat Zalo
      </a>
    </div>
  );
}
