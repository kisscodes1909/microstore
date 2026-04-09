import { MapPin, Phone, Clock, Mail, Facebook, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "0901 234 567\n0912 345 678",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Clock,
    label: "Giờ mở cửa",
    value: "Thứ 2 – Thứ 7: 7:30 – 20:00\nChủ nhật: 8:00 – 18:00",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@veloshop.vn\nsupport@veloshop.vn",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

export function ContactMap() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Liên hệ</p>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800 }}
          >
            Ghé thăm hoặc liên hệ với chúng tôi
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            Chúng tôi luôn sẵn sàng tư vấn miễn phí và giải đáp mọi thắc mắc của bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left col: info + form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className={`flex gap-3 p-4 ${item.bg} border ${item.border} rounded-2xl`}
                >
                  <div className={`${item.bg} p-2 rounded-xl border ${item.border} shrink-0 h-fit`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 text-sm mb-0.5">{item.label}</div>
                    <div className="text-gray-600 text-xs whitespace-pre-line leading-relaxed">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors min-h-[48px]"
              >
                <Facebook className="w-4 h-4 shrink-0" />
                Facebook
              </a>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                Chat Zalo
              </a>
            </div>
          </div>

          {/* Right col: map + form */}
          <div className="lg:col-span-3 space-y-5">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-blue-600 px-5 py-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span className="text-white font-semibold text-sm">VeloShop – Bản đồ cửa hàng</span>
              </div>
              <iframe
                title="VeloShop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.446683956785!2d106.70021457583755!3d10.776997289373285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2zTmd1eeG7hW4gSHXhu4csIELhur9uIE5naMOpLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1svi!2sus!4v1700000000000!5m2!1svi!2sus"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-base">Gửi tin nhắn cho chúng tôi</h3>
              {sent && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <span>✅</span> Tin nhắn đã gửi thành công! Chúng tôi sẽ liên hệ lại trong 30 phút.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Họ và tên *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nhập tên của bạn"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Số điện thoại *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0901 234 567"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all min-h-[48px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Tin nhắn</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Bạn muốn tư vấn về xe gì? Ngân sách dự kiến?"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white py-3.5 rounded-xl text-sm font-bold transition-all min-h-[52px]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
