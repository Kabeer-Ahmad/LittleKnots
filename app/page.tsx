
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import CategorySection from "./components/CategorySection";
import AboutPreview from "./components/AboutPreview";
import ContactSection from "./components/ContactSection";
import LatestCreationsSlider from "./components/LatestCreationsSlider";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-accent/30 font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Slider Section */}
        <section className="w-full">
          <HeroSlider />
        </section>

        {/* Hero Content Section */}
        <section className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-dark mb-6 drop-shadow-sm leading-tight">
            Handmade crochet with love
          </h1>
        </section>

        {/* Shop by Categories Section */}
        <CategorySection />

        {/* About Preview Section */}
        <AboutPreview />

        {/* Latest Creations Slider */}
        <LatestCreationsSlider />

        {/* Contact Section */}
        <ContactSection />

      </main>

      <Footer />
    </div>
  );
}
