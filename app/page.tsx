import HeroSection from "@/components/HeroSection";
import StorybookSequence from "@/components/StorybookSequence";
import ProductSpread from "@/components/ProductSpread";
import PackageColumns from "@/components/PackageColumns";
import MiniCowFeature from "@/components/MiniCowFeature";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorybookSequence />
      <ProductSpread />
      <PackageColumns />
      <MiniCowFeature />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
