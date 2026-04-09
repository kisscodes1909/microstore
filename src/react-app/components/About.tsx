import { CheckCircle2, Star } from "lucide-react";
import { store } from "@/data/store";

const highlights = [
  "Phân phối chính hãng Giant, Trek, Specialized, Merida",
  "Kỹ thuật viên được đào tạo bài bản tại nước ngoài",
  "Xưởng sửa chữa hiện đại, đầy đủ thiết bị chuyên dụng",
  "Cam kết hoàn tiền 100% nếu sản phẩm lỗi từ NSX",
  "Hỗ trợ trả góp 0% qua thẻ tín dụng các ngân hàng lớn",
];

const stats: { value: string; label: string; star?: boolean }[] = [
  { value: "500+", label: "Mẫu xe" },
  { value: "10+", label: "Năm KN" },
  { value: "2.000+", label: "Khách hàng" },
  { value: "4.9", label: "Đánh giá TB", star: true },
];

export function About() {
  return (
    <section id="about" className="py-10 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image side — shown first on mobile */}
          <div className="relative order-1 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600327713015-08077f65b388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwc2hvcCUyMGludGVyaW9yJTIwc3RvcmUlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1MTg2ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={`${store.brand} — cửa hàng`}
                className="w-full h-52 sm:h-72 object-cover"
              />
            </div>
            {/* Secondary image — only show on sm+ to avoid overflow issues */}
            <div className="hidden sm:block absolute -bottom-5 right-6 w-36 sm:w-44 h-28 sm:h-36 rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1671543445386-36520a3fcca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwbWVjaGFuaWMlMjByZXBhaXIlMjB3b3Jrc2hvcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzUxODY4NDV8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Xưởng kỹ thuật"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Rating pill */}
            <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" aria-hidden />
              <div>
                <div className="font-black text-gray-800 text-sm leading-none">4.9 / 5</div>
                <div className="text-gray-500 text-[10px] leading-none mt-0.5">2.000+ đánh giá</div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-2 lg:order-2 sm:pb-6 lg:pb-0">
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">Về chúng tôi</p>
            <h2
              className="text-gray-900 mb-4"
              style={{ fontSize: "clamp(1.4rem, 5vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}
            >
              Cửa hàng xe đạp{" "}
              <span className="text-blue-600">uy tín #1</span>
              <br />
              tại địa phương
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-base">
              {store.brand} phục vụ khách hàng tại {store.area} với sứ mệnh mang đến xe đạp và phụ tùng chất lượng,
              tư vấn chọn size, lắp ráp và bảo hành chu đáo. {store.tagline}
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5 mb-6">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 border border-blue-100 rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center py-3 sm:py-4 px-1 ${i !== stats.length - 1 ? "border-r border-blue-100" : ""}`}
                >
                  <div
                    className="text-blue-700 font-black leading-none flex items-center justify-center gap-0.5"
                    style={{ fontSize: "clamp(0.9rem, 3vw, 1.3rem)" }}
                  >
                    {s.star ? (
                      <>
                        {s.value}
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" aria-hidden />
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="text-gray-500 text-[9px] sm:text-xs mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
