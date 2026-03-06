// app/page.tsx — Homepage: composes all sections per SCOPE
import { Hero } from "@/components/sections/hero";
import { PainStrip } from "@/components/sections/pain-strip";
import { Work } from "@/components/sections/work";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen pt-[60px] font-[family-name:var(--font-dm-sans)]">
      <main>
        <Hero />
        <Work />
        <Pricing />
        <FAQ />
        <PainStrip />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
