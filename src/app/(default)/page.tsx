export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Pricing from "@/components/pricing-home";
import SplitCarousel from "@/components/split-carousel";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <div className="text-red-500 font-bold p-4 border border-red-500 mb-6">
        Tailwind is working if you see this in red with a red border
      </div>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <SplitCarousel />
      <Pricing />
      <Cta />
    </>
  );
}