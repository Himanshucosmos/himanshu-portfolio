import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
