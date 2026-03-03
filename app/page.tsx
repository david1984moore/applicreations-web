// app/page.tsx — Homepage: composes all sections per SCOPE
import { Hero } from "@/components/sections/hero";
import { PainStrip } from "@/components/sections/pain-strip";
import { Process } from "@/components/sections/process";
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
        <section id="work" className="py-12">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold text-text-muted">
              Our work
            </h2>
            <p className="mt-2 text-text-secondary">
              Portfolio coming soon.
            </p>
          </div>
        </section>
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
