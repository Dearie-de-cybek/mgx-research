import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResearchSection from "@/components/ResearchSection";
import ServicesSection from "@/components/ServicesSection";
import PillarsSection from "@/components/PillarsSection";
import CampusSection from "@/components/CampusSection";
import ProductsSection from "@/components/ProductsSection";
import FooterSection from "@/components/FooterSection";
import DesignSwitcher from "@/components/DesignSwitcher";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ResearchSection />
      <ServicesSection />
      <PillarsSection />
      <CampusSection />
      <ProductsSection />
      <FooterSection />
      <DesignSwitcher />
    </>
  );
}
