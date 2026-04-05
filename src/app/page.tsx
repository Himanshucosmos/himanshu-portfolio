import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ContactSection } from "@/components/sections/ContactSection";

import { NightShiftSection } from "@/components/sections/NightShiftSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden scanlines">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <NightShiftSection />
      <ContactSection />
    </main>
  );
}
