import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />

      <AboutSection />
      <ServicesSection />
      <ProductsSection />
    </>
  );
}
