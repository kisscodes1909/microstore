import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@/react-app/data/products";
import { store } from "@/data/store";

type Props = {
  products: Product[];
};

function formatPrice(v: number) {
  return v.toLocaleString("vi-VN") + "₫";
}

export default function ProductQuickViewIsland({ products }: Props) {
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const [openId, setOpenId] = useState<number | null>(null);

  // expose a tiny API for SSG buttons
  if (typeof window !== "undefined") {
    (window as any).__qbOpenQuickView = (id: number) => setOpenId(id);
  }

  const product = openId != null ? byId.get(openId) ?? null : null;

  if (!product) return null;

  const discount =
    product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

  const close = () => setOpenId(null);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={close}>
      <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" />

      <div
        className="relative bg-white w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <span className="text-[10px] text-blue-600 font-semibold uppercase">{product.category}</span>
            <h2 className="text-gray-900 font-black text-base sm:text-lg leading-tight">{product.name}</h2>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label="Đóng"
            type="button"
          >
            <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid sm:grid-cols-2 gap-0">
            <div className="bg-gray-50 relative">
              <img src={product.image} alt={product.name} className="w-full h-56 sm:h-full object-cover" />
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

            <div className="p-5 sm:p-6 flex flex-col gap-4">
              <div>
                <div className="text-red-600 font-black" style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                  {formatPrice(product.price)}
                </div>
                {product.oldPrice && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">{formatPrice(product.oldPrice)}</span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-lg">
                      Tiết kiệm {formatPrice(product.oldPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-400">
                Mã SP: <span className="font-semibold text-gray-600">{product.sku}</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{product.desc}</p>

              {product.specs?.length ? (
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
              ) : null}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-100 p-4 flex gap-3">
          <a
            href={`tel:${store.phoneTel}`}
            className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-4 py-3 text-sm font-bold transition-colors min-h-[52px] shrink-0"
          >
            Tư vấn
          </a>
          <a
            href={`/products/${product.id}/`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-bold transition-colors min-h-[52px]"
          >
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
}

