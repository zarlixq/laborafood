import Navbar from "@/blocks/Navbar";
import Hero from "@/blocks/Hero";
import ServicesGrid from "@/blocks/ServicesGrid";
import WhyLaboraFood from "@/blocks/WhyLaboraFood";
import AnalysisShowcase from "@/blocks/AnalysisShowcase";
import ProcessTimeline from "@/blocks/ProcessTimeline";
import AccreditationStatus from "@/blocks/AccreditationStatus";
import RegulatoryCompliance from "@/blocks/RegulatoryCompliance";
import TrackingCTA from "@/blocks/TrackingCTA";
import BlogPreview from "@/blocks/BlogPreview";
import CTASection from "@/blocks/CTASection";
import Footer from "@/blocks/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <WhyLaboraFood />
        <AnalysisShowcase />
        <ProcessTimeline />
        <AccreditationStatus />
        <RegulatoryCompliance />
        <TrackingCTA />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
