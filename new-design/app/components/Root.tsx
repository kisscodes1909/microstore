import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { FloatingContact } from "./FloatingContact";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // On product detail page, the page has its own sticky bottom bar
  const isProductDetail = /^\/products\/\d+/.test(pathname);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      {/*
        Mobile:  Navbar h-14 (56px) → pt-14
        Desktop: TopBar (36px inside Navbar) + Navbar (64px) = 100px → md:pt-[100px]
      */}
      <main className="flex-1 pt-14 md:pt-[100px]">
        <Outlet />
      </main>

      {/* Spacer so fixed bottom bar doesn't cover last content on mobile */}
      <div className="md:hidden h-[72px]" />

      <Footer />

      {/* MobileCTA (Gọi + Zalo) — hide on product detail which has its own bar */}
      {!isProductDetail && <MobileCTA />}

      <FloatingContact />
    </div>
  );
}
