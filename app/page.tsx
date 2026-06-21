import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import Process from "./components/Process";
import FeaturedProjects from "./components/FeaturedProjects";
import OtherProjects from "./components/OtherProjects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Testimonials from "./components/Testimonials";
import Articles from "./components/Articles";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function SectionDivider() {
  return <div className="section-divider" />;
}

export default function Home() {
  return (
    <>
      <PageLoader />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Global z-index layer above dot-grid */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Stats />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Process />
          <SectionDivider />
          <FeaturedProjects />
          <SectionDivider />
          <OtherProjects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <Articles />
          <SectionDivider />
          <FAQ />
          <SectionDivider />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
