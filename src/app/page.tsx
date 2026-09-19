import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhatWeBuild from "@/components/WhatWeBuild";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <WhatWeBuild />
        <Services />
        <Testimonials />
        <Work />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
