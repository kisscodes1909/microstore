const brands = [
  { name: "Giant", sub: "Đài Loan" },
  { name: "Trek", sub: "Hoa Kỳ" },
  { name: "Specialized", sub: "Hoa Kỳ" },
  { name: "Merida", sub: "Đài Loan" },
  { name: "Scott", sub: "Thụy Sĩ" },
  { name: "Shimano", sub: "Nhật Bản" },
];

export function Brands() {
  return (
    <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <p className="text-gray-400 text-sm font-medium">
            Đại lý ủy quyền chính thức các thương hiệu hàng đầu thế giới
          </p>
        </div>
        <div className="flex overflow-x-auto gap-4 sm:gap-0 sm:grid sm:grid-cols-6 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 items-center scrollbar-none">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex-none sm:flex-auto flex flex-col items-center justify-center py-5 px-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 cursor-default group min-w-[110px]"
            >
              {/* Brand initial as stylized text logo */}
              <div
                className="text-gray-300 group-hover:text-blue-600 font-black transition-colors duration-300 leading-none mb-1"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", letterSpacing: "-0.02em" }}
              >
                {brand.name}
              </div>
              <div className="text-gray-300 group-hover:text-blue-400 text-[10px] transition-colors">
                {brand.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
