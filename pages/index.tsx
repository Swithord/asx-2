import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import HeroBanner from "@/components/herobanner";
import Mission from "@/components/mission";
import Latest from "@/components/latest";
import Events from "@/components/events";
import AboutUs from "@/components/aboutus";
import Speakers from "@/components/speakers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div className='container flex flex-col items-center justify-center min-h-screen px-4 py-8 mx-auto gap-5 sm:gap-10 md:gap-15'>
      <HeroBanner />
            <Mission />
            <Latest />
            <Events />
            <AboutUs />
            <Speakers />
            {/* <div className="main-button__wrapper">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScbjRnREhkQ-Mjv-mw8uGO5Jm03D7NjZTL_pEZQKMw2afP3Aw/viewform" target="_blank" rel="noopener noreferrer" className="main-button">Become a Member</a>
            </div> */}
    </div>
    <Footer />
    </div>

  );
}
