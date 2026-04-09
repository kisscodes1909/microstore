import { ArrowRight, Shield, Star, Truck, Phone } from "lucide-react";
import { Link } from "react-router";

export function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gray-950 flex items-center"
      style={{ minHeight: "calc(100svh - 56px)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1758231187893-fab297349f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjeWNsaW5nJTIwcm9hZCUyMGJpa2UlMjBzcGVlZHxlbnwxfHx8fDE3NzUxODY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950/80 sm:bg-gradient-to-r sm:from-gray-950 sm:via-gray-900/85 sm:to-gray-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 max-w-7xl mx-auto py-10 sm:py-20">
        <div className="max-w-xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur-sm rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-blue-200 text-xs font-medium">Cửa hàng chính hãng · 10 năm kinh nghiệm</span>
          </div>

          {/* Headline */}
          <h1
            className="text-white mb-4 leading-[1.1]"
            style={{ fontSize: "clamp(1.9rem, 8vw, 3.8rem)", fontWeight: 900 }}
          >
            Xe Đạp Chất Lượng
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #38bdf8)" }}
            >
              Giá Tốt Nhất
            </span>{" "}
            Địa Phương
          </h1>

          <p className="text-gray-300 text-sm sm:text-base mb-7 leading-relaxed max-w-md">
            Phân phối chính hãng Giant, Trek, Specialized, Merida – hơn{" "}
            <span className="text-white font-semibold">500+ mẫu xe</span> cho mọi nhu cầu. Bảo hành 24 tháng.
          </p>

          {/* CTAs — full width stacked on mobile, side by side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-7 py-4 rounded-2xl font-bold text-base transition-all hover:shadow-lg hover:shadow-blue-600/30 min-h-[56px] w-full sm:w-auto"
            >
              Xem sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0901234567"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/30 text-white px-7 py-4 rounded-2xl font-bold text-base transition-all min-h-[56px] w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              Gọi tư vấn ngay
            </a>
          </div>

          {/* Mini trust strip */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
            {[
              { icon: Shield, text: "BH chính hãng 24 tháng" },
              { icon: Truck, text: "Free ship nội thành" },
              { icon: Star, text: "4.9★ từ 2.000+ KH" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-gray-300 text-sm">
                <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-700/90 backdrop-blur-sm border-t border-blue-600/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-blue-600/50">
            {[
              { value: "500+", label: "Mẫu xe" },
              { value: "10+", label: "Năm KN" },
              { value: "2.000+", label: "Khách hài lòng" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-3 sm:py-5">
                <span
                  className="text-white font-black leading-none"
                  style={{ fontSize: "clamp(1.1rem, 4vw, 1.8rem)" }}
                >
                  {stat.value}
                </span>
                <span className="text-blue-200 text-[10px] sm:text-sm mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
