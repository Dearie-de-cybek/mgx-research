import Header          from "@/components/v3/Header";
import HeroSection     from "@/components/v3/HeroSection";
import ResearchSection from "@/components/v3/ResearchSection";
import FocusSection    from "@/components/v3/FocusSection";
import PillarsSection  from "@/components/v3/PillarsSection";
import ManifestoSection from "@/components/v3/ManifestoSection";
import CampusSection   from "@/components/v3/CampusSection";
import FooterSection   from "@/components/v3/FooterSection";
import DesignSwitcher  from "@/components/DesignSwitcher";

export default function ApexPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <ResearchSection />
      <FocusSection />
      <PillarsSection />
      <ManifestoSection />
      <CampusSection />
      <FooterSection />
      <DesignSwitcher />
    </>
  );
}
