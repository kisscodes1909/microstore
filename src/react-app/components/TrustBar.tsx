import { Truck, ShieldCheck, Headphones, RefreshCw } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    desc: "Đơn từ 500.000₫",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hành chính hãng",
    desc: "12 – 24 tháng",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Headphones,
    title: "Tư vấn miễn phí",
    desc: "7:30 – 20:00 mỗi ngày",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: RefreshCw,
    title: "Đổi trả dễ dàng",
    desc: "Trong vòng 7 ngày",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      {/* Mobile: horizontal scroll */}
      <div className="flex overflow-x-auto gap-3 px-4 py-4 sm:hidden scrollbar-none -mx-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 shrink-0 min-w-[200px]"
          >
            <div className={`${item.bg} p-2 rounded-xl shrink-0`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">{item.title}</div>
              <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* sm+: 4 col grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-x divide-gray-100">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3 px-5 py-5">
            <div className={`${item.bg} p-2.5 rounded-xl shrink-0`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">{item.title}</div>
              <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
