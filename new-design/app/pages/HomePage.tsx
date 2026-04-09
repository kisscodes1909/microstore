import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { CategoryShowcase } from "../components/CategoryShowcase";
import { Products } from "../components/Products";
import { PromoBanner } from "../components/PromoBanner";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Brands } from "../components/Brands";
import { Testimonials } from "../components/Testimonials";
import { ContactMap } from "../components/ContactMap";

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryShowcase />
      <Products />
      <PromoBanner />
      <About />
      <Services />
      <Brands />
      <Testimonials />
      <ContactMap />
    </>
  );
}
