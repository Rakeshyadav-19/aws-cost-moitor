// app/(landing)/page.tsx
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import DashboardPreview from "@/components/landing/DashboardPreview";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TechStack from "@/components/landing/TechStack";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <DashboardPreview />
      <FeaturesSection />
      <HowItWorks />
      <TechStack />
      <CTASection />
      <Footer />
    </main>
  );
}
