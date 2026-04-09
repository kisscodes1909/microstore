import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Bike,
  Phone,
  ChevronRight,
  Home,
  Package,
  Info,
  Wrench,
  Mail,
  Clock,
  PartyPopper,
  MessageCircle,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { CATEGORIES } from "../data/products";
import { store } from "@/data/store";

const navLinks = [
  { label: "Trang chủ", href: "/", icon: Home },
  { label: "Giới thiệu", href: "#about", icon: Info },
  { label: "Dịch vụ", href: "#services", icon: Wrench },
  { label: "Liên hệ", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNav = (href: string) => {
    setIsOpen(false);
    setShowCategories(false);
    if (href.startsWith("#")) {
      if (!isHomePage) {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 350);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href.replace("#", ""));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* TopBar — desktop only */}
        <div className="hidden md:block bg-blue-800 text-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 text-xs relative">
              <div className="flex items-center gap-5">
                <a href={`tel:${store.phoneTel}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone className="w-3 h-3" /> {store.phoneDisplay}
                </a>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 shrink-0 opacity-90" aria-hidden />
                  {store.hours}
                </span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5 text-yellow-300 shrink-0" aria-hidden />
                <span className="text-white font-medium">Miễn phí vận chuyển cho đơn từ 500.000₫</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-200">
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href={store.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Zalo</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded-xl">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="text-blue-700 leading-tight"
                  style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "-0.02em" }}
                >
                  {store.brand}
                </div>
                <div className="text-gray-400 leading-none hidden sm:block" style={{ fontSize: "0.58rem" }}>
                  {store.tagline}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Trang chủ
              </Link>
              {/* Products with dropdown */}
              <div className="relative group">
                <Link
                  to="/products"
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname.startsWith("/products")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Sản phẩm
                </Link>
                <div className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-xl border border-gray-100 py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-semibold border-b border-gray-50 mb-1"
                  >
                    Tất cả sản phẩm
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              {["#about", "#services", "#contact"].map((href, i) => {
                const labels = ["Giới thiệu", "Dịch vụ", "Liên hệ"];
                return (
                  <button
                    key={href}
                    onClick={() => handleNav(href)}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors rounded-lg hover:bg-blue-50"
                  >
                    {labels[i]}
                  </button>
                );
              })}
            </nav>

            {/* Right: call + hamburger */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${store.phoneTel}`}
                className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors min-h-[40px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{store.phoneDisplay}</span>
                <span className="md:hidden">Gọi</span>
              </a>
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setIsOpen(true)}
                aria-label="Mở menu"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
            onClick={() => { setIsOpen(false); setShowCategories(false); }}
          />

          {/* Slide-in panel from right */}
          <div className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-xl">
                  <Bike className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-blue-700">{store.brand}</span>
              </div>
              <button
                onClick={() => { setIsOpen(false); setShowCategories(false); }}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto py-3">
              {!showCategories ? (
                <>
                  {/* Main nav links */}
                  {navLinks.map(({ label, href, icon: Icon }) => (
                    <button
                      key={href}
                      onClick={() => handleNav(href)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left min-h-[56px] border-b border-gray-50"
                    >
                      <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-semibold">{label}</span>
                    </button>
                  ))}

                  {/* Products -> categories */}
                  <button
                    onClick={() => setShowCategories(true)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left min-h-[56px] border-b border-gray-50"
                  >
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-semibold flex-1">Sản phẩm</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Promo strip */}
                  <div className="mx-5 mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <div className="text-blue-800 font-bold text-sm mb-1 flex items-center gap-1.5">
                      <PartyPopper className="w-4 h-4 shrink-0" aria-hidden />
                      Ưu đãi hôm nay
                    </div>
                    <div className="text-blue-600 text-xs">Miễn phí vận chuyển đơn từ 500.000₫</div>
                    <div className="text-blue-600 text-xs mt-0.5">Giảm 20% xe địa hình & đô thị</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Back button */}
                  <button
                    onClick={() => setShowCategories(false)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-blue-600 hover:bg-blue-50 transition-colors min-h-[56px] border-b border-gray-100"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span className="font-bold">Danh mục sản phẩm</span>
                  </button>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors min-h-[56px] border-b border-gray-50"
                  >
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Tất cả sản phẩm</div>
                      <div className="text-gray-400 text-xs">Xem toàn bộ catalog</div>
                    </div>
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-blue-50 transition-colors min-h-[56px] border-b border-gray-50"
                    >
                      <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{cat.name}</div>
                        <div className="text-gray-400 text-xs">{cat.count} sản phẩm</div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-gray-100 flex gap-3">
              <a
                href={`tel:${store.phoneTel}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-2xl py-3.5 font-bold text-sm min-h-[52px]"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Gọi ngay
              </a>
              <a
                href={store.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-teal-500 text-white rounded-2xl py-3.5 font-bold text-sm min-h-[52px]"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
                Zalo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
