import { Hero } from "@/components/home/Hero";
import { BenefitsBar } from "@/components/home/BenefitsBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PromoSection } from "@/components/home/PromoSection";
import { BestSellers } from "@/components/home/BestSellers";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsBar />
      <CategoryGrid />
      <PromoSection />
      <BestSellers />
      <Testimonials />
    </>
  );
}
