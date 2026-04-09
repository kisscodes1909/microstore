import { ArrowRight, Zap, Wrench } from "lucide-react";
import { store } from "@/data/store";

export function PromoBanner() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8 sm:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Card 1 – Flash sale */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group min-h-[160px] sm:min-h-[200px]"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
            }}
            onClick={() => handleScroll("#products")}
          >
            <div className="absolute right-0 bottom-0 w-40 sm:w-52 h-40 sm:h-52 opacity-10">
              <div className="w-full h-full rounded-full bg-white" />
            </div>
            <div className="absolute top-6 right-4 sm:right-8 bottom-0 flex items-center opacity-20">
              <Zap className="w-24 sm:w-32 h-24 sm:h-32 text-yellow-300" />
            </div>
            <div className="relative z-10 p-5 sm:p-8">
              <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                <Zap className="w-3.5 h-3.5 shrink-0" aria-hidden />
                Flash Sale
              </span>
              <h3 className="text-white font-black mb-1.5" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
                Giảm đến 20%
              </h3>
              <p className="text-blue-200 text-sm mb-4">Ưu đãi giới hạn cho xe đô thị & địa hình</p>
              <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                Mua ngay <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card 2 – Service */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group min-h-[160px] sm:min-h-[200px]"
            style={{
              background: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
            }}
            onClick={() => handleScroll("#services")}
          >
            <div className="absolute right-0 bottom-0 w-40 sm:w-52 h-40 sm:h-52 opacity-10">
              <div className="w-full h-full rounded-full bg-white" />
            </div>
            <div className="relative z-10 p-5 sm:p-8">
              <span className="inline-flex items-center gap-1.5 bg-emerald-300 text-emerald-900 text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                <Wrench className="w-3.5 h-3.5 shrink-0" aria-hidden />
                Dịch vụ
              </span>
              <h3 className="text-white font-black mb-1.5" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
                Bảo dưỡng miễn phí
              </h3>
              <p className="text-emerald-200 text-sm mb-4">Khi mua xe tại {store.brand} – áp dụng 1 lần</p>
              <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                Đặt lịch ngay <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
