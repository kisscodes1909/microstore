import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Văn An",
    role: "Cyclist nghiệp dư",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NVA&backgroundColor=b6e3f4",
    rating: 5,
    product: "Trek Marlin 7",
    comment:
      "Mua chiếc Trek Marlin tại đây, nhân viên tư vấn rất nhiệt tình và chuyên nghiệp. Xe chạy êm, bảo dưỡng nhanh. Sẽ giới thiệu cho bạn bè!",
    verified: true,
  },
  {
    name: "Trần Thị Bình",
    role: "Khách hàng thân thiết",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TTB&backgroundColor=ffd5dc",
    rating: 5,
    product: "Giant Defy Advanced",
    comment:
      "Cửa hàng giá cả hợp lý, xe đẹp, đội ngũ sửa chữa chuyên nghiệp. Tôi đã mua 2 xe tại đây cho cả gia đình và đều rất hài lòng.",
    verified: true,
  },
  {
    name: "Lê Minh Cường",
    role: "Vận động viên",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LMC&backgroundColor=c0aede",
    rating: 5,
    product: "Merida Reacto",
    comment:
      "Giant Defy Advanced 3 chạy mượt mà, khung siêu nhẹ. Cửa hàng có chế độ bảo hành rõ ràng minh bạch, dịch vụ hậu mãi tuyệt vời.",
    verified: true,
  },
  {
    name: "Phạm Thu Hà",
    role: "Nhân viên văn phòng",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PTH&backgroundColor=d1f0c0",
    rating: 5,
    product: "Specialized Sirrus 3.0",
    comment:
      "Mua xe đô thị đi làm hàng ngày, nhân viên tư vấn rất tận tình giúp tôi chọn được chiếc phù hợp. Giao hàng nhanh, đóng gói cẩn thận.",
    verified: true,
  },
];

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-1">Đánh giá</p>
            <h2
              className="text-gray-900"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800 }}
            >
              Khách hàng nói gì về chúng tôi?
            </h2>
          </div>
          {/* Overall rating */}
          <div className="hidden sm:flex flex-col items-center bg-blue-600 text-white px-6 py-3 rounded-2xl">
            <span className="font-black" style={{ fontSize: "1.8rem", lineHeight: 1 }}>4.9</span>
            <div className="flex mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              ))}
            </div>
            <span className="text-blue-200 text-xs mt-1">2.000+ đánh giá</span>
          </div>
        </div>

        {/* Reviews – horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 scrollbar-none">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 shrink-0 w-[82vw] sm:w-auto flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-blue-100 mb-3" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">"{t.comment}"</p>

              {/* Product */}
              <div className="text-blue-600 text-xs font-semibold mb-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block w-fit">
                🚲 {t.product}
              </div>

              {/* User */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full bg-gray-100 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-gray-800 text-sm truncate">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
                {t.verified && (
                  <div className="ml-auto text-green-500 shrink-0" title="Đã xác minh">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
