// app/page.tsx — Homepage: composes all sections per SCOPE
import { Hero } from "@/components/sections/hero";
import { PainStrip } from "@/components/sections/pain-strip";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface pt-[60px] font-sans">
      <main>
        <Hero />
        <PainStrip />
        <Process />
        <Work />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
