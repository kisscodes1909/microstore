import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import {
  Grid3X3, List, ArrowUpDown, ChevronRight, Home
} from "lucide-react";
import { ALL_PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import type { Product } from "../data/products";
import type { Category } from "../data/products";

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "rating", label: "Đánh giá cao" },
  { value: "popular", label: "Phổ biến nhất" },
];

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") as Category | null;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(urlCategory);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const activeCategory = CATEGORIES.find((c) => c.name === selectedCategory);

  const filtered = useMemo(() => {
    let list = selectedCategory
      ? ALL_PRODUCTS.filter((p) => p.category === selectedCategory)
      : ALL_PRODUCTS;

    switch (sortBy) {
      case "price-asc":  return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating":     return [...list].sort((a, b) => b.rating - a.rating);
      case "popular":    return [...list].sort((a, b) => b.reviews - a.reviews);
      default:           return list;
    }
  }, [selectedCategory, sortBy]);

  const selectCategory = (cat: Category | null) => {
    setSelectedCategory(cat);
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gray-900" style={{ height: "clamp(180px, 28vw, 280px)" }}>
        {activeCategory ? (
          <>
            <img
              src={activeCategory.image}
              alt={activeCategory.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${activeCategory.gradient}`} />
          </>
        ) : (
          <>
            <img
              src="https://images.unsplash.com/photo-1598252166987-089ce5fb3250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwcmFjaW5nJTIwYmlrZSUyMGNhcmJvbiUyMGxpZ2h0d2VpZ2h0JTIwc3BvcnR8ZW58MXx8fHwxNzc1MjY1NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Products"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-transparent" />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" /> Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Sản phẩm</span>
            {activeCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white font-medium">{activeCategory.name}</span>
              </>
            )}
          </div>
          <h1 className="text-white font-black" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", lineHeight: 1.1 }}>
            {activeCategory ? activeCategory.name : "Tất cả sản phẩm"}
          </h1>
          {activeCategory && (
            <p className="text-white/70 mt-2 text-sm">{activeCategory.desc}</p>
          )}
        </div>
      </div>

      {/* Category tab bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none -mx-1 px-1">
            <button
              onClick={() => selectCategory(null)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors min-h-[36px] ${
                !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tất cả ({ALL_PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = ALL_PRODUCTS.filter((p) => p.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors min-h-[36px] ${
                    selectedCategory === cat.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-gray-800">{filtered.length}</span> sản phẩm
          </p>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm pl-4 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-blue-400 min-h-[44px] cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* View mode */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors min-w-[40px] min-h-[44px] flex items-center justify-center ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors min-w-[40px] min-h-[44px] flex items-center justify-center ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚲</div>
            <h3 className="text-gray-700 font-bold text-lg mb-2">Chưa có sản phẩm</h3>
            <p className="text-gray-500 text-sm mb-5">Danh mục này chưa có sản phẩm nào.</p>
            <button
              onClick={() => selectCategory(null)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold"
            >
              Xem tất cả
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onView={setSelectedProduct} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onView={setSelectedProduct} viewMode="list" />
            ))}
          </div>
        )}
      </div>

      {/* Product quick-view modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
