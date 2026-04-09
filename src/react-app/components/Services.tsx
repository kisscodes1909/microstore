import { Wrench, RefreshCw, Settings, Zap, Package, Users, ArrowRight, Timer } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Sửa chữa & Bảo dưỡng",
    desc: "Đội thợ lành nghề, sửa chữa nhanh chóng mọi loại xe đạp từ xe đua đến xe điện.",
    time: "30 phút – 2 giờ",
    light: "bg-blue-50",
    iconColor: "text-blue-600",
    activeBg: "bg-blue-600",
  },
  {
    icon: RefreshCw,
    title: "Thay linh kiện chính hãng",
    desc: "Cung cấp và lắp đặt phụ tùng chính hãng từ Shimano, SRAM, Campagnolo.",
    time: "Ngay trong ngày",
    light: "bg-green-50",
    iconColor: "text-green-600",
    activeBg: "bg-green-600",
  },
  {
    icon: Settings,
    title: "Căn chỉnh & Setup",
    desc: "Tinh chỉnh hệ thống phanh, truyền động và tư thế lái theo thông số chuẩn.",
    time: "1 – 3 giờ",
    light: "bg-orange-50",
    iconColor: "text-orange-500",
    activeBg: "bg-orange-500",
  },
  {
    icon: Zap,
    title: "Nâng cấp xe điện",
    desc: "Nâng cấp pin, motor và hệ thống điện tử cho e-bike thế hệ mới.",
    time: "Theo yêu cầu",
    light: "bg-purple-50",
    iconColor: "text-purple-600",
    activeBg: "bg-purple-600",
  },
  {
    icon: Package,
    title: "Phụ kiện & Bảo hộ",
    desc: "Mũ bảo hiểm, găng tay, đèn, túi yên, bơm tay và nhiều phụ kiện khác.",
    time: "Có sẵn tại kho",
    light: "bg-rose-50",
    iconColor: "text-rose-500",
    activeBg: "bg-rose-500",
  },
  {
    icon: Users,
    title: "Tư vấn chọn xe",
    desc: "Chuyên viên giúp bạn chọn chiếc xe phù hợp nhất với nhu cầu và ngân sách.",
    time: "Hoàn toàn miễn phí",
    light: "bg-teal-50",
    iconColor: "text-teal-600",
    activeBg: "bg-teal-600",
  },
];

export function Services() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-10 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Dịch vụ</p>
          <h2 className="text-gray-900" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)", fontWeight: 800 }}>
            Dịch vụ toàn diện, tận tâm
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:hidden scrollbar-none mb-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-gray-100 shrink-0 flex flex-col"
              style={{ width: "72vw", minWidth: "240px" }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.light}`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1.5 text-sm leading-snug">{s.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{s.desc}</p>
              <span className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 w-fit inline-flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
                {s.time}
              </span>
            </div>
          ))}
        </div>

        {/* sm+: Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${s.light} group-hover:${s.activeBg}`}>
                <s.icon className={`w-5 h-5 transition-colors duration-300 ${s.iconColor} group-hover:text-white`} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-base">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 inline-flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
                {s.time}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1671543445386-36520a3fcca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwbWVjaGFuaWMlMjByZXBhaXIlMjB3b3Jrc2hvcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzUxODY4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Xưởng kỹ thuật"
            className="w-full object-cover h-44 sm:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/75 to-transparent flex items-center">
            <div className="px-5 sm:px-10 py-6 max-w-lg">
              <h3
                className="text-white font-black mb-2"
                style={{ fontSize: "clamp(1rem, 4vw, 1.6rem)" }}
              >
                Xưởng kỹ thuật hiện đại
              </h3>
              <p className="text-blue-200 text-sm mb-4 hidden sm:block">
                Trang bị máy móc chuyên dụng nhập khẩu, kỹ thuật viên được chứng nhận quốc tế.
              </p>
              <button
                onClick={() => handleScroll("#contact")}
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-xl text-sm font-bold transition-colors min-h-[48px]"
              >
                Đặt lịch bảo dưỡng <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
