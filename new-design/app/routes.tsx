import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🚲</div>
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

export const router = createBrowserRouter([
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
]);