import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ALL_PRODUCTS, CATEGORIES, type Category } from "../data/products";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import type { Product } from "../data/products";

const allLabel = "Tất cả";

export function Products() {
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredCategories = [allLabel, ...CATEGORIES.map((c) => c.name)];

  const filtered = (
    activeCategory === allLabel
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === (activeCategory as Category))
  ).slice(0, 8);

  return (
    <section id="products" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-1">Sản phẩm nổi bật</p>
            <h2 className="text-gray-900" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800 }}>
              Xe đạp & Phụ tùng bán chạy
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
          >
            Tất cả sản phẩm <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 mb-7 scrollbar-none">
          {featuredCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all min-h-[40px] ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={setSelectedProduct}
              viewMode="grid"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors min-h-[52px]"
          >
            Xem tất cả {ALL_PRODUCTS.length}+ sản phẩm <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product detail modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
