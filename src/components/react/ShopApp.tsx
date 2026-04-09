import { RouterProvider } from "react-router";
import { router } from "@/react-app/routes";

export default function ShopApp() {
  return <RouterProvider router={router} />;
}
