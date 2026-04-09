import { X, Star, ShoppingCart, Phone, Shield, Truck, RefreshCw, CheckCircle2 } from "lucide-react";
import type { Product } from "../data/products";
import { useEffect } from "react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

function formatPrice(p: number) {
  return p.toLocaleString("vi-VN");
}

export function ProductModal({ product, onClose }: Props) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <span className="text-[10px] text-blue-600 font-semibold uppercase">{product.category}</span>
            <h2 className="text-gray-900 font-black text-base sm:text-lg leading-tight">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          <div className="grid sm:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gray-50 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 sm:h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow-lg">
                  -{discount}%
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <span className="bg-gray-800 text-white font-bold px-4 py-2 rounded-xl">Hết hàng</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">{product.rating} ({product.reviews} đánh giá)</span>
              </div>

              {/* Price */}
              <div>
                <div className="text-red-600 font-black" style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                  {formatPrice(product.price)}₫
                </div>
                {product.oldPrice && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">{formatPrice(product.oldPrice)}₫</span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-lg">Tiết kiệm {formatPrice(product.oldPrice - product.price)}₫</span>
                  </div>
                )}
                {product.installment && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Trả góp 0% qua thẻ tín dụng
                  </div>
                )}
              </div>

              {/* SKU */}
              <div className="text-xs text-gray-400">Mã SP: <span className="font-semibold text-gray-600">{product.sku}</span></div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{product.desc}</p>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide border-b border-gray-100">
                    Thông số kỹ thuật
                  </div>
                  <div className="divide-y divide-gray-50">
                    {product.specs.map((s) => (
                      <div key={s.label} className="flex px-4 py-2.5 text-sm">
                        <span className="text-gray-500 w-32 shrink-0">{s.label}</span>
                        <span className="font-semibold text-gray-800">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Shield, text: "BH 24 tháng" },
                  { icon: Truck, text: "Free ship" },
                  { icon: RefreshCw, text: "Đổi 7 ngày" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1 bg-blue-50 rounded-xl py-2.5 px-2 text-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-700 font-semibold leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="shrink-0 border-t border-gray-100 p-4 flex gap-3">
          <a
            href="tel:0901234567"
            className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-4 py-3 text-sm font-bold transition-colors min-h-[52px] shrink-0"
          >
            <Phone className="w-4 h-4" />
            Tư vấn
          </a>
          <button
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl py-3 text-sm font-bold transition-colors min-h-[52px]"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? "Đặt hàng ngay" : "Hết hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}
