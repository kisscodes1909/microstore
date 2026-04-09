import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ChevronRight, Home, Star, ShoppingCart, Phone, Heart,
  Share2, Shield, Truck, RefreshCw, CheckCircle2, Zap,
  Minus, Plus, ChevronLeft, ChevronRight as ChevronRightIcon,
  Tag, MessageCircle, ArrowRight, Bike, Check
} from "lucide-react";
import { ALL_PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../data/products";
import { store } from "@/data/store";

function formatPrice(p: number) {
  return p.toLocaleString("vi-VN");
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sz} ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : i < rating ? "text-yellow-300 fill-yellow-300" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

const fakeReviews = [
  { name: "Nguyễn Văn An", date: "01/04/2026", rating: 5, comment: "Xe đẹp, chắc chắn, giao hàng nhanh. Shop tư vấn nhiệt tình, sẽ quay lại mua thêm!", avatar: "NA" },
  { name: "Trần Thị Bích", date: "28/03/2026", rating: 5, comment: "Mua cho con đi học, xe rất nhẹ và chắc. Bảo hành chu đáo. Rất hài lòng!", avatar: "TB" },
  { name: "Lê Minh Khôi", date: "20/03/2026", rating: 4, comment: "Sản phẩm tốt đúng mô tả, giao hàng đúng hẹn. Trừ 1 sao vì hộp hơi móp.", avatar: "LK" },
];

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = ALL_PRODUCTS.find((p) => p.id === Number(id));

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Bike className="w-24 h-24 sm:w-28 sm:h-28 text-blue-600 mb-5" strokeWidth={1.25} aria-hidden />
        <h1 className="text-gray-800 font-black text-2xl mb-2">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-500 mb-6">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
          Xem tất cả sản phẩm
        </Link>
      </div>
    );
  }

  // Fake multiple images by reusing the product image
  const images = [product.image, product.image, product.image];

  const related = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const catInfo = CATEGORIES.find((c) => c.name === product.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors shrink-0">
              <Home className="w-3.5 h-3.5" /> Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to="/products" className="hover:text-blue-600 transition-colors shrink-0">Sản phẩm</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-blue-600 transition-colors shrink-0"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* ---- Image gallery ---- */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ aspectRatio: "4/3" }}>
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              {product.badge && (
                <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow`}>
                  <Tag className="w-3 h-3" /> {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow">
                  -{discount}%
                </span>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <span className="bg-gray-800 text-white font-bold px-5 py-2.5 rounded-xl text-lg">Hết hàng</span>
                </div>
              )}
              {/* Prev/Next arrows */}
              <button
                onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-2 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setActiveImg((activeImg + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-2 rounded-xl transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-blue-500 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
                  style={{ aspectRatio: "1/1" }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Share + wishlist */}
            <div className="flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all text-sm font-semibold min-h-[48px] ${
                  liked ? "border-red-300 bg-red-50 text-red-500" : "border-gray-200 hover:border-gray-300 text-gray-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
                {liked ? "Đã lưu" : "Yêu thích"}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-500 text-sm font-semibold min-h-[48px] transition-colors">
                <Share2 className="w-4 h-4" />
                Chia sẻ
              </button>
            </div>
          </div>

          {/* ---- Product info ---- */}
          <div className="flex flex-col gap-5">
            {/* Category + SKU */}
            <div className="flex items-center justify-between">
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Bike className="w-3 h-3" /> {product.category}
              </Link>
              <span className="text-gray-400 text-xs">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-gray-900 leading-tight" style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)", fontWeight: 900 }}>
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={product.rating} size="md" />
              <span className="text-gray-600 text-sm font-semibold">{product.rating}/5</span>
              <span className="text-gray-400 text-sm">({product.reviews} đánh giá)</span>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {product.inStock ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    Còn hàng
                  </>
                ) : (
                  "Hết hàng"
                )}
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100">
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-red-600 font-black" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", lineHeight: 1 }}>
                  {formatPrice(product.price)}₫
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-base sm:text-lg mb-0.5">
                    {formatPrice(product.oldPrice)}₫
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-lg">
                    Tiết kiệm {formatPrice(product.oldPrice - product.price)}₫ ({discount}%)
                  </span>
                </div>
              )}
              {product.installment && (
                <div className="mt-3 flex items-center gap-2 text-green-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">Trả góp 0% qua Visa / Mastercard / JCB</span>
                </div>
              )}
            </div>

            {/* Quick specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {product.specs.slice(0, 4).map((s) => (
                  <div key={s.label} className="bg-white rounded-xl border border-gray-100 px-3 py-2.5">
                    <div className="text-gray-400 text-[10px] font-medium uppercase tracking-wide mb-0.5">{s.label}</div>
                    <div className="text-gray-800 text-sm font-bold">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-semibold text-sm">Số lượng:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 active:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-gray-800">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 active:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-400 text-sm">Còn 12 chiếc</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <button
                disabled={!product.inStock}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold text-base transition-all hover:shadow-lg hover:shadow-blue-200 min-h-[56px] active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? "Đặt hàng ngay" : "Hết hàng"}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${store.phoneTel}`}
                  className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3.5 rounded-2xl font-semibold text-sm transition-colors min-h-[52px] active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  Gọi tư vấn
                </a>
                <a
                  href={store.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 py-3.5 rounded-2xl font-semibold text-sm transition-colors min-h-[52px] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  Zalo chat
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { icon: Shield, title: "BH 24 tháng", sub: "Chính hãng", color: "text-blue-600 bg-blue-50" },
                { icon: Truck, title: "Free ship", sub: "Nội thành HCM", color: "text-green-600 bg-green-50" },
                { icon: RefreshCw, title: "Đổi 7 ngày", sub: "Lỗi 1 đổi 1", color: "text-orange-600 bg-orange-50" },
              ].map(({ icon: Icon, title, sub, color }) => (
                <div key={title} className={`flex flex-col items-center gap-1.5 ${color} rounded-xl py-3 px-2 text-center`}>
                  <Icon className="w-5 h-5" />
                  <div className="text-xs font-bold leading-tight">{title}</div>
                  <div className="text-[10px] opacity-70 leading-tight">{sub}</div>
                </div>
              ))}
            </div>

            {/* Flash sale countdown placeholder */}
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
              <Zap className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <div className="text-red-700 font-bold text-sm">Ưu đãi kết thúc sau:</div>
                <div className="flex gap-2 mt-1">
                  {["02", "14", "37"].map((v, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="bg-red-600 text-white font-black text-sm px-2 py-0.5 rounded-md">{v}</span>
                      {i < 2 && <span className="text-red-400 font-bold">:</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Tabs: Mô tả / Thông số / Đánh giá ---- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-10 overflow-hidden">
          {/* Tab headers */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { key: "desc", label: "Mô tả sản phẩm" },
              { key: "specs", label: "Thông số kỹ thuật" },
              { key: "reviews", label: `Đánh giá (${product.reviews})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 sm:p-8">
            {activeTab === "desc" && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-base">{product.desc}</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    "Khung và phụ kiện nguyên bản 100% từ nhà sản xuất",
                    "Kiểm tra và căn chỉnh kỹ thuật trước khi giao",
                    "Hỗ trợ lắp ráp miễn phí tại nhà (nội thành HCM)",
                    "Tặng kèm: bơm xe, khóa chữ U, đèn LED phía trước",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Chính sách bảo hành
                  </h4>
                  <ul className="space-y-1.5 text-sm text-blue-800">
                    <li>• Bảo hành khung xe <strong>24 tháng</strong> tại cửa hàng</li>
                    <li>• Bảo hành linh kiện <strong>12 tháng</strong> lỗi do nhà sản xuất</li>
                    <li>• Đổi trả trong <strong>7 ngày</strong> nếu sản phẩm bị lỗi</li>
                    <li>• Bảo dưỡng miễn phí lần đầu sau <strong>1 tháng</strong> sử dụng</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specs" && product.specs && (
              <div className="overflow-hidden rounded-2xl border border-gray-100">
                {product.specs.map((s, i) => (
                  <div key={s.label} className={`flex items-center gap-4 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <span className="text-gray-500 w-44 shrink-0 font-medium">{s.label}</span>
                    <span className="text-gray-800 font-semibold">{s.value}</span>
                  </div>
                ))}
                <div className={`flex items-center gap-4 px-5 py-4 text-sm ${product.specs.length % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <span className="text-gray-500 w-44 shrink-0 font-medium">Xuất xứ</span>
                  <span className="text-gray-800 font-semibold">Taiwan / Đài Loan</span>
                </div>
                <div className={`flex items-center gap-4 px-5 py-4 text-sm ${(product.specs.length + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <span className="text-gray-500 w-44 shrink-0 font-medium">Màu sắc</span>
                  <span className="text-gray-800 font-semibold">Đen / Xanh / Trắng</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="text-center">
                    <div className="text-gray-900 font-black" style={{ fontSize: "3.5rem", lineHeight: 1 }}>{product.rating}</div>
                    <StarRating rating={product.rating} size="md" />
                    <div className="text-gray-400 text-sm mt-1">{product.reviews} đánh giá</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-3">{star}</span>
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-5">
                  {fakeReviews.map((r) => (
                    <div key={r.name} className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                        {r.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-800 text-sm">{r.name}</span>
                          <StarRating rating={r.rating} />
                          <span className="text-gray-400 text-xs">{r.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Write review CTA */}
                <div className="text-center pt-4">
                  <a
                    href={`tel:${store.phoneTel}`}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm"
                  >
                    Để lại đánh giá của bạn
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---- Related products ---- */}
        {related.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Cùng danh mục</p>
                <h2 className="text-gray-900 font-black" style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}>
                  Sản phẩm liên quan
                </h2>
              </div>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                Xem thêm <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="cursor-pointer"
                >
                  <ProductCard product={p} viewMode="grid" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl px-4 py-3 flex gap-3 md:hidden z-40">
        <a
          href={`tel:${store.phoneTel}`}
          className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-2xl font-bold text-sm min-h-[52px] w-28 shrink-0"
        >
          <Phone className="w-4 h-4" />
          Gọi
        </a>
        <button
          disabled={!product.inStock}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-2xl font-bold text-sm min-h-[52px] active:scale-95 transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? "Đặt hàng ngay" : "Hết hàng"}
        </button>
      </div>
      {/* Spacer so sticky bar doesn't overlap content */}
      <div className="h-24 md:hidden" />
    </div>
  );
}