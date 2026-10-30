
import Hero from "@/components/Hero";
import BrandPrinciples from "@/components/home/BrandPrinciples";
import FluidBackground from "@/components/animations/FluidBackground";
import Services from "@/components/home/Services";
import WorkShowcase from "@/components/home/WorkShowcase";
import ContactFooter from "@/components/home/ContactFooter";
import Manifesto from "@/components/home/Manifesto";
import Approach from "@/components/home/Approach";

export default function Home() {
  return (
    <main
      id="home"
      className="relative isolate min-h-screen overflow-clip bg-[#EFEFEF] text-[#151515]"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <FluidBackground />
      </div>

      <div className="relative z-10">
   
        <Hero />
        <BrandPrinciples />
        <Manifesto />
        <Services />
        <Approach />
        <WorkShowcase />
        <ContactFooter />
      </div>
    </main>
  );
}
