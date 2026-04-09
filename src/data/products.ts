export type Product = {
  slug: string;
  name: string;
  category: 'Đô thị' | 'Địa hình' | 'Trẻ em' | 'Đua/road' | 'Gấp';
  priceVnd?: number;
  summary: string;
  image: string; // /public path
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: 'xe-dap-do-thi-alto-7',
    name: 'Xe đạp đô thị Alto 7',
    category: 'Đô thị',
    priceVnd: 5990000,
    summary: 'Dễ chạy, tư thế thoải mái, phù hợp đi làm và dạo phố.',
    image: '/products/alto-7.svg',
    highlights: ['Khung nhẹ', '7 tốc độ', 'Bảo hành chính hãng'],
  },
  {
    slug: 'mtb-ridge-26',
    name: 'MTB Ridge 26',
    category: 'Địa hình',
    priceVnd: 7490000,
    summary: 'Bền bỉ cho đường xấu, đi phượt nhẹ và leo dốc.',
    image: '/products/ridge-26.svg',
    highlights: ['Phuộc trước', 'Phanh đĩa', 'Lốp bám đường'],
  },
  {
    slug: 'xe-dap-gap-urban-fold',
    name: 'Xe đạp gấp Urban Fold',
    category: 'Gấp',
    priceVnd: 8900000,
    summary: 'Gấp gọn mang lên xe buýt/ô tô, phù hợp căn hộ nhỏ.',
    image: '/products/urban-fold.svg',
    highlights: ['Gấp nhanh', 'Nhẹ', 'Dễ mang vác'],
  },
  {
    slug: 'xe-dap-tre-em-kid-16',
    name: 'Xe đạp trẻ em Kid 16"',
    category: 'Trẻ em',
    priceVnd: 2590000,
    summary: 'Khung chắc chắn, yên mềm; phù hợp cho bé mới tập.',
    image: '/products/kid-16.svg',
    highlights: ['Bánh phụ (tuỳ chọn)', 'Sơn bền', 'An toàn'],
  },
  {
    slug: 'road-sprint-700c',
    name: 'Road Sprint 700C',
    category: 'Đua/road',
    priceVnd: 12990000,
    summary: 'Nhẹ và nhanh, dành cho người thích tốc độ và fitness.',
    image: '/products/road-sprint.svg',
    highlights: ['Bánh 700C', 'Khung hợp kim', 'Đi nhóm cuối tuần'],
  },
  {
    slug: 'xe-dap-do-thi-classic-stepthrough',
    name: 'City Classic (Step-through)',
    category: 'Đô thị',
    priceVnd: 6890000,
    summary: 'Khung thấp dễ lên xuống, hợp đi chợ và dạo phố.',
    image: '/products/city-classic.svg',
    highlights: ['Khung thấp', 'Giỏ trước (tuỳ chọn)', 'Êm ái'],
  },
  {
    slug: 'mtb-trail-29',
    name: 'MTB Trail 29',
    category: 'Địa hình',
    priceVnd: 9990000,
    summary: 'Bánh 29 lăn tốt, ổn định khi chạy đường dài và sỏi đá.',
    image: '/products/trail-29.svg',
    highlights: ['Bánh 29"', 'Phanh đĩa', 'Đi đường dài tốt'],
  },
  {
    slug: 'xe-dap-gap-mini-compact',
    name: 'Mini Compact 20"',
    category: 'Gấp',
    priceVnd: 4990000,
    summary: 'Giải pháp gọn nhẹ cho quãng ngắn, dễ cất gọn.',
    image: '/products/mini-compact.svg',
    highlights: ['Bánh 20"', 'Gọn', 'Dễ bảo dưỡng'],
  },
  {
    slug: 'xe-dap-tre-em-kid-20',
    name: 'Xe đạp trẻ em Kid 20"',
    category: 'Trẻ em',
    priceVnd: 2990000,
    summary: 'Cho bé lớn hơn; tư thế ngồi thoải mái, dễ điều khiển.',
    image: '/products/kid-20.svg',
    highlights: ['Phù hợp 6–9 tuổi', 'An toàn', 'Bền'],
  },
  {
    slug: 'xe-dap-do-thi-commuter-pro',
    name: 'Commuter Pro',
    category: 'Đô thị',
    priceVnd: 0,
    summary: 'Bản cấu hình theo yêu cầu. Nhắn Zalo để tư vấn và báo giá.',
    image: '/products/commuter-pro.svg',
    highlights: ['Tư vấn size', 'Lắp ráp tại cửa hàng', 'Bảo hành rõ ràng'],
  },
];

