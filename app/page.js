import Navbar from "@/blocks/Navbar";
import Hero from "@/blocks/Hero";
import TrustBar from "@/blocks/TrustBar";
import ServicesGrid from "@/blocks/ServicesGrid";
import AnalysisShowcase from "@/blocks/AnalysisShowcase";
import ProcessTimeline from "@/blocks/ProcessTimeline";
import Accreditation from "@/blocks/Accreditation";
import Stats from "@/blocks/Stats";
import Testimonials from "@/blocks/Testimonials";
import BlogPreview from "@/blocks/BlogPreview";
import CTASection from "@/blocks/CTASection";
import Footer from "@/blocks/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicesGrid />
        <AnalysisShowcase />
        <ProcessTimeline />
        <Accreditation />
        <Stats />
        <Testimonials />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
