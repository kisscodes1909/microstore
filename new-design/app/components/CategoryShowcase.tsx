import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { CATEGORIES } from "../data/products";

const gradientMap: Record<string, string> = {
  blue: "from-blue-900/80",
  green: "from-green-900/80",
  pink: "from-rose-900/80",
  orange: "from-orange-900/80",
  purple: "from-purple-900/80",
};

export function CategoryShowcase() {
  return (
    <section className="py-8 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-5 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Danh mục</p>
            <h2 className="text-gray-900" style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", fontWeight: 800 }}>
              Khám phá dòng sản phẩm
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors shrink-0"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile: horizontal scroll chips + stacked cards */}
        <div className="sm:hidden">
          {/* Category pill scroll */}
          <div className="flex gap-2.5 overflow-x-auto px-4 pb-4 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="relative rounded-2xl overflow-hidden shrink-0 flex-none"
                style={{ width: "65vw", height: "180px" }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradientMap[cat.color]} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white/70 text-xs mb-0.5">{cat.count} sản phẩm</div>
                  <h3 className="text-white font-bold text-base leading-tight">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* sm+: Bento grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8">
          {/* Large card */}
          <Link
            to={`/products?category=${encodeURIComponent(CATEGORIES[0].name)}`}
            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ minHeight: "280px" }}
          >
            <img
              src={CATEGORIES[0].image}
              alt={CATEGORIES[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${gradientMap[CATEGORIES[0].color]} to-transparent`} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full mb-2">
                {CATEGORIES[0].count} sản phẩm
              </span>
              <h3 className="text-white font-black mb-1" style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)" }}>
                {CATEGORIES[0].name}
              </h3>
              <p className="text-white/70 text-sm">{CATEGORIES[0].desc}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                Xem ngay <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* 4 small cards */}
          {CATEGORIES.slice(1).map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ minHeight: "140px" }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${gradientMap[cat.color]} to-transparent`} />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="text-white/70 text-xs mb-0.5">{cat.count} sản phẩm</div>
                <h3 className="text-white font-bold text-sm sm:text-base">{cat.name}</h3>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
