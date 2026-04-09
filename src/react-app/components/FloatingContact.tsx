import { useState, useEffect } from "react";
import { Phone, MapPin, MessageCircle, Share2, ChevronUp, X } from "lucide-react";
import { store } from "@/data/store";

const contacts = [
  {
    id: "phone",
    icon: Phone,
    label: "Gọi ngay",
    sub: store.phoneDisplay,
    href: `tel:${store.phoneTel}`,
    bg: "bg-blue-600 hover:bg-blue-700",
    ring: "ring-blue-300",
    tooltip: "Gọi điện trực tiếp",
    external: false,
  },
  {
    id: "zalo",
    icon: MessageCircle,
    label: "Chat Zalo",
    sub: "Phản hồi nhanh",
    href: store.zaloUrl,
    bg: "bg-teal-500 hover:bg-teal-600",
    ring: "ring-teal-300",
    tooltip: "Nhắn Zalo",
    external: true,
  },
  {
    id: "facebook",
    icon: Share2,
    label: "Facebook",
    sub: "Theo dõi cửa hàng",
    href: "#",
    bg: "bg-indigo-600 hover:bg-indigo-700",
    ring: "ring-indigo-300",
    tooltip: "Facebook",
    external: false,
  },
  {
    id: "maps",
    icon: MapPin,
    label: "Chỉ đường",
    sub: "Google Maps",
    href: store.mapsPlaceUrl,
    bg: "bg-rose-500 hover:bg-rose-600",
    ring: "ring-rose-300",
    tooltip: "Mở bản đồ",
    external: true,
  },
];

export function FloatingContact() {
  const [expanded, setExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div
        className={`hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-2.5 transition-all duration-500 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        }`}
      >
        {contacts.map((c) => (
          <div key={c.id} className="relative group flex items-center">
            <div className="absolute right-14 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg">
              <div>{c.label}</div>
              <div className="text-gray-400 text-[10px]">{c.sub}</div>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
            </div>
            <a
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className={`${c.bg} text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ring-2 ring-white group-hover:scale-110 group-hover:ring-4 ${c.ring}`}
              aria-label={c.label}
            >
              <c.icon className="w-5 h-5" />
            </a>
          </div>
        ))}

        <div className="h-px bg-gray-300 mx-2 my-1" />

        <button
          type="button"
          onClick={scrollTop}
          className={`bg-gray-700 hover:bg-gray-800 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ring-2 ring-white hover:scale-110 ${
            showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`lg:hidden fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-500 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {expanded && (
          <div className="flex flex-col items-end gap-2 mb-1">
            {contacts.map((c, i) => (
              <a
                key={c.id}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className={`${c.bg} text-white flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl transition-all duration-200 min-h-[48px]`}
                style={{
                  animationDelay: `${i * 60}ms`,
                  transitionDelay: `${i * 40}ms`,
                }}
                onClick={() => setExpanded(false)}
              >
                <c.icon className="w-4 h-4 shrink-0" />
                <div className="text-right">
                  <div className="font-bold text-xs leading-tight">{c.label}</div>
                  <div className="text-white/75 text-[10px] leading-tight">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ring-4 ring-blue-200"
          aria-label="Liên hệ"
        >
          {expanded ? (
            <X className="w-5 h-5" />
          ) : (
            <Phone className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
}
