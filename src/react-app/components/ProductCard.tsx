import { ShoppingCart, Star, Heart, Eye, Tag, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import type { Product } from "../data/products";
import { store } from "@/data/store";

interface Props {
  product: Product;
  onView?: (product: Product) => void;
  viewMode?: "grid" | "list";
}

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN");
}

function getDiscount(price: number, oldPrice: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function ProductCard({ product, onView, viewMode = "grid" }: Props) {
  const navigate = useNavigate();
  const goToDetail = () => navigate(`/products/${product.id}`);

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex gap-3 sm:gap-4 p-3 sm:p-4">
        {/* Image */}
        <div
          className="relative w-24 h-24 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-gray-50 cursor-pointer"
          onClick={goToDetail}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className={`absolute top-1.5 left-1.5 ${product.badgeColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md`}>
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold px-1.5 py-0.5 bg-gray-700 rounded">Hết hàng</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-blue-600 font-semibold uppercase mb-0.5">{product.category}</div>
            <h3
              className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors leading-snug"
              onClick={goToDetail}
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
              </div>
              <span className="text-gray-400 text-[10px]">({product.reviews})</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-red-600 font-black text-base leading-none">{formatPrice(product.price)}₫</div>
              {product.oldPrice && (
                <div className="text-gray-400 line-through text-xs mt-0.5">{formatPrice(product.oldPrice)}₫</div>
              )}
              {product.installment && <div className="text-green-600 text-[10px] font-semibold mt-0.5">Trả góp 0%</div>}
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={goToDetail}
                className="p-2 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <Eye className="w-4 h-4" />
              </button>
              <a
                href={`tel:${store.phoneTel}`}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors min-h-[40px]"
              >
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">Gọi mua</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW — cùng hệ `.catalog-card` với danh mục (global.css)
  return (
    <div className="group catalog-card catalog-card--interactive">
      {/* Image */}
      <div className="catalog-card__media cursor-pointer" onClick={goToDetail}>
        <img src={product.image} alt={product.name} />
        {/* Badges */}
        {product.badge && (
          <span className={`absolute top-2 left-2 ${product.badgeColor} text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5`}>
            <Tag className="w-2 h-2" /> {product.badge}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">
            -{getDiscount(product.price, product.oldPrice)}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl">Hết hàng</span>
          </div>
        )}

        {/* Desktop hover overlay — hidden on mobile (touch) */}
        <div className="hidden sm:flex absolute bottom-0 left-0 right-0 gap-2 p-2.5 translate-y-full hover-parent-hover:translate-y-0 transition-transform duration-300 group-hover:translate-y-0">
        </div>
        <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="catalog-card__body">
        <div className="text-[10px] text-blue-600 font-semibold uppercase mb-0.5 truncate">{product.brand}</div>
        <h3
          className="font-bold text-gray-800 mb-1.5 line-clamp-2 leading-snug flex-1 cursor-pointer hover:text-blue-600 transition-colors"
          style={{ fontSize: "clamp(0.76rem, 2.5vw, 0.88rem)" }}
          onClick={goToDetail}
        >
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
            ))}
          </div>
          <span className="text-gray-400 text-[10px]">({product.reviews})</span>
        </div>
        {/* Price */}
        <div className="mb-2.5">
          <div className="text-red-600 font-black leading-none" style={{ fontSize: "clamp(0.88rem, 3vw, 1rem)" }}>
            {formatPrice(product.price)}₫
          </div>
          {product.oldPrice && (
            <div className="text-gray-400 line-through text-[10px] mt-0.5">{formatPrice(product.oldPrice)}₫</div>
          )}
          {product.installment && <div className="text-green-600 text-[10px] font-semibold mt-0.5">Trả góp 0%</div>}
        </div>

        {/* Action buttons — always visible (no hover-required) */}
        <div className="flex gap-1.5 mt-auto">
          <button
            onClick={goToDetail}
            className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 text-white py-2.5 rounded-xl text-xs font-bold transition-colors min-h-[40px]"
            disabled={!product.inStock}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{product.inStock ? "Xem ngay" : "Hết hàng"}</span>
          </button>
          <a
            href={`tel:${store.phoneTel}`}
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 p-2.5 rounded-xl transition-colors min-w-[40px] min-h-[40px]"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
