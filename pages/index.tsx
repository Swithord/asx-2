import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { GetServerSideProps } from "next";
import HeroBanner from "@/components/herobanner";
import Mission from "@/components/mission";
import Latest from "@/components/latest";
import Events from "@/components/events";
import AboutUs from "@/components/aboutus";
import Speakers from "@/components/speakers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { fetchNews, Article } from "./api/news";
import Link from "next/link";

interface HomeProps {
  news: Article[];
}

export default function Home({ news }: HomeProps) {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div className='container flex flex-col items-center justify-center min-h-screen px-4 pb-8 mx-auto gap-5 sm:gap-10 md:gap-15'>
      <HeroBanner />
            <Mission />
            <Latest news={news} />
            <Events />
            <AboutUs />
            <div className="flex justify-center">
                <Link 
                    href="/membership"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-background text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
                >
                    <span>Become a Member</span>
                    <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
            <Speakers />
            {/* <div className="main-button__wrapper">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScbjRnREhkQ-Mjv-mw8uGO5Jm03D7NjZTL_pEZQKMw2afP3Aw/viewform" target="_blank" rel="noopener noreferrer" className="main-button">Become a Member</a>
            </div> */}
    </div>
    <Footer />
    </div>

  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const newsData = await fetchNews(3);
    return {
      props: {
        news: newsData.items,
      },
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      props: {
        news: [],
      },
    };
  }
};
