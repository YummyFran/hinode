import Hero from "./Hero";
import TechStack from "./TechStack";
import Features from "./Features";
import Product from "./Product";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Landing() {
  return (
    <>
        <NavBar />
        <Hero />
        <TechStack />
        <Features />
        <Product />
        <Pricing />
        <Testimonials />
        <CTA />
        <Footer />
    </>
  )
}
