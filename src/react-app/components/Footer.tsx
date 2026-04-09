import { Bike, Share2, PlayCircle, Camera, MapPin, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { store } from "@/data/store";

const quickLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Liên hệ", href: "#contact" },
];

const productLinks = [
  "Xe đạp thể thao",
  "Xe đạp địa hình",
  "Xe đạp đô thị",
  "Xe đạp điện",
  "Xe đạp trẻ em",
  "Phụ kiện & Bảo hộ",
];

const serviceLinks = [
  "Sửa chữa & Bảo dưỡng",
  "Thay linh kiện",
  "Căn chỉnh & Setup",
  "Nâng cấp xe điện",
  "Tư vấn chọn xe",
];

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 sm:border-0">
      <button
        className="w-full flex items-center justify-between py-4 sm:py-0 sm:cursor-default sm:mb-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-bold text-sm">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 sm:hidden transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "block" : "hidden"} sm:block pb-4 sm:pb-0`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Newsletter strip */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold text-base mb-1">Đăng ký nhận ưu đãi độc quyền 🎁</h4>
              <p className="text-gray-500 text-sm">Nhận thông báo khuyến mãi, sản phẩm mới và tips đạp xe.</p>
            </div>
            {subscribed ? (
              <div className="bg-green-900/40 border border-green-700 text-green-400 px-5 py-3 rounded-xl text-sm font-medium shrink-0 w-full sm:w-auto text-center">
                ✅ Đăng ký thành công!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto shrink-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="flex-1 sm:w-56 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[48px]"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[48px] shrink-0"
                >
                  Đăng ký <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 sm:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2 pb-6 sm:pb-0 border-b border-gray-800 sm:border-0 mb-2 sm:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-black" style={{ fontSize: "1.1rem" }}>{store.brand}</div>
                <div className="text-blue-500 text-xs">{store.tagline}</div>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-xs">
              {store.description}
            </p>
            <div className="space-y-2 mb-4">
              <a href={`tel:${store.phoneTel}`} className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" /> {store.phoneDisplay}
              </a>
              <a href={store.zaloUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Chat Zalo
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { icon: Share2, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
                { icon: PlayCircle, href: "#", label: "Youtube", color: "hover:bg-red-600" },
                { icon: Camera, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`bg-gray-800 ${color} p-2.5 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links — accordion on mobile */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6 mt-2 sm:mt-0">
            <AccordionSection title="Liên kết nhanh">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-gray-500 hover:text-blue-400 text-sm transition-colors py-1 text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link to={link.href} className="text-gray-500 hover:text-blue-400 text-sm transition-colors py-1 block">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection title="Sản phẩm">
              <ul className="space-y-2">
                {productLinks.map((p) => (
                  <li key={p}>
                    <Link to="/products" className="text-gray-500 hover:text-blue-400 text-sm transition-colors py-1 block">
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection title="Dịch vụ">
              <ul className="space-y-2">
                {serviceLinks.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollTo("#services")}
                      className="text-gray-500 hover:text-blue-400 text-sm transition-colors py-1 text-left"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} {store.brand}. Tất cả quyền được bảo lưu.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
            <span>Chính sách bảo mật</span>
            <span>·</span>
            <span>Điều khoản sử dụng</span>
            <span>·</span>
            <span>Chính sách đổi trả</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
