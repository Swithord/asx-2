import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import asx2425 from '../assets/asx2425.jpeg';
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import telescope from '../assets/telescope.svg';
import planet from '../assets/planet.svg';
import { Button } from "@/components/ui/button";
import email from '../assets/email.svg';
import discord from '../assets/discord.svg';
import instagram from '../assets/instagram.svg';
import linkedin from '../assets/linkedin.svg';
import facebook from '../assets/facebook.svg';
import youtube from '../assets/youtube.svg';
import { Badge } from "@/components/ui/badge";

export default function About() {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
                <Navbar />
                <div className='w-full flex-col sm:flex-row flex-grow flex gap-5 px-4 sm:gap-10 md:gap-15 justify-center'>
                    work in progress!
                </div>
                <Footer />
            </div>
        </div>

    );
}
