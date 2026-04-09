import { createBrowserRouter } from "react-router";
import { Bike } from "lucide-react";
import { Root } from "./components/Root";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Bike className="w-24 h-24 sm:w-28 sm:h-28 text-blue-600 mb-6 mx-auto" strokeWidth={1.25} aria-hidden />
      <h1 className="text-gray-800 font-black text-3xl mb-3">Trang không tồn tại</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Xin lỗi, trang bạn tìm kiếm không tồn tại. Vui lòng quay lại trang chủ.
      </p>
      <a
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
      >
        Về trang chủ
      </a>
    </div>
  );
}

const basename =
  import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: HomePage },
        { path: "products", Component: ProductsPage },
        { path: "products/:id", Component: ProductDetailPage },
        { path: "*", Component: NotFound },
      ],
    },
  ],
  { basename },
);