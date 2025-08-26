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
                <div className='text-2xl md:text-3xl'>ASX Links</div>
                <div className='w-full flex-col sm:flex-row flex-grow flex gap-5 px-4 sm:gap-10 md:gap-15 justify-center'>
                    <div className='flex flex-col h-full w-full lg:w-1/3 items-center self-start justify-start'>
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLScbjRnREhkQ-Mjv-mw8uGO5Jm03D7NjZTL_pEZQKMw2afP3Aw/viewform' className='bg-primary p-3 rounded rounded-lg text-lg text-black text-center md:text-xl'>Become a Member / Subscribe to our Newsletter!</a>
                        <div className='flex flex-col gap-5 w-full items-center pt-10'>
                            <div className='absolute -translate-y-1/2 z-10 px-4 bg-black'>
                                <div className='text-xl md:text-2xl'>Contact Us</div>
                            </div>
                            <div className='flex gap-3 border rounded-lg border-gray-700 text-lg md:text-xl p-6 sm:p-8 pt-10 items-center w-full'>
                                <Image
                                    src={email}
                                    alt="Email"
                                    className="object-cover w-8 h-8 filter brightness-0 invert"
                                    width={30}
                                    height={30}
                                />
                                <a href="mailto:space.association.utasx@gmail.com" className="bg-secondary text-black p-1 block w-full break-words break-all whitespace-normal">space.association.utasx@gmail.com</a>
                            </div>

                        </div>
                        <div className='flex flex-col gap-5 w-full items-center pt-10'>
                            <div className='absolute -translate-y-1/2 z-10 px-4 bg-black'>
                                <div className='text-xl md:text-2xl'>Socials</div>
                            </div>
                            <div className='flex flex-col gap-5 border rounded-lg border-gray-700 text-base md:text-lg p-6 sm:p-8 pt-10 items-center w-full'>
                                <div className='flex gap-3 w-full items-center'>
                                    <Image
                                    src={discord}
                                    alt="Discord"
                                    className="object-cover w-8 h-8 filter brightness-0 invert"
                                    width={30}
                                    height={30}
                                />
                                <a href="https://discord.gg/your-discord-link" className='bg-secondary text-black p-1'>Discord</a>
                                <Badge variant={'default'} className='text-sm bg-white text-black'>New!</Badge>
                                </div>
                                <div className='flex gap-3 w-full items-center'>
                                    <Image
                                        src={instagram}
                                        alt="Instagram"
                                        className="object-cover w-8 h-8 filter brightness-0 invert"
                                        width={30}
                                        height={30}
                                    />
                                    <a href="https://www.instagram.com/asx_uoft/" className='bg-secondary text-black p-1'>Instagram</a>
                                </div>
                                <div className='flex gap-3 w-full items-center'>
                                    <Image
                                        src={linkedin}
                                        alt="LinkedIn"
                                        className="object-cover w-8 h-8 filter brightness-0 invert"
                                        width={30}
                                        height={30}
                                    />
                                    <a href="https://www.linkedin.com/company/asx-society/" className='bg-secondary text-black p-1'>LinkedIn</a>
                                </div>
                                <div className='flex gap-3 w-full items-center'>
                                    <Image
                                        src={facebook}
                                        alt="Facebook"
                                        className="object-cover w-8 h-8 filter brightness-0 invert"
                                        width={30}
                                        height={30}
                                    />
                                    <a href="https://www.facebook.com/ASXAssoc" className='bg-secondary text-black p-1'>Facebook</a>
                                </div>
                                <div className='flex gap-3 w-full items-center'>
                                    <Image
                                        src={youtube}
                                        alt="YouTube"
                                        className="object-cover w-8 h-8 filter brightness-0 invert"
                                        width={30}
                                        height={30}
                                    />
                                    <a href="https://www.youtube.com/@astronomyandspaceexplorati5753" className='bg-secondary text-black p-1'>YouTube</a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col h-full w-full lg:w-1/3 items-center self-start justify-start'>
                        <div className='flex flex-col gap-5 w-full items-center pt-10'>
                            <div className='absolute -translate-y-1/2 z-10 px-4 bg-black'>
                                <div className='text-xl md:text-2xl'>Astronomy Resources</div>
                            </div>
                            <div className='flex flex-col gap-5 border rounded-lg border-gray-700 text-base md:text-lg p-6 sm:p-8 pt-10 items-left w-full'>
                                <div className='text-lg md:text-xl'>UofT related</div>
                                <a href="https://astro.utoronto.ca/" className='bg-secondary text-black p-1 w-fit'>Department of Astronomy & Astrophysics</a>
                                <li><a href="https://www.astro.utoronto.ca/astrotours/singlepage/discover/#:~:text=On%20the%20first%20Thursday%20of,or%20sign%2Dup%20is%20required." className='bg-secondary text-black p-1 w-fit'>Public Tours</a></li>
                                <a href="https://www.dunlap.utoronto.ca/" className='bg-secondary text-black p-1 w-fit'>Dunlap Institute for Astronomy & Astrophysics</a>
                                <a href="https://mississauga.rasc.ca/" className='bg-secondary text-black p-1 w-fit'>Royal Astronomical Society (RASC) @ UofT Mississauga</a>
                                <a href="https://www.utias.utoronto.ca/" className='bg-secondary text-black p-1 w-fit'>Institute for Aerospace Studies (UTIAS)</a>
                                <div className='text-lg md:text-xl'>Canadian Astronomy & Space Groups</div>
                                <a href="https://astroatyork.wixsite.com/acyu" className='bg-secondary text-black p-1 w-fit'>Astronomy Club @ York University</a>
                                <a href="https://www.casi.ca/" className='bg-secondary text-black p-1 w-fit'>Canadian Aeronautics & Space Institute (CASI)</a>
                                <a href="https://www.css.ca/" className='bg-secondary text-black p-1 w-fit'>Canadian Space Society (CSS)</a>
                                <a href="https://www.marssociety.ca/" className='bg-secondary text-black p-1 w-fit'>Mars Society of Canada</a>
                                <a href="https://www.nyaa.ca/" className='bg-secondary text-black p-1 w-fit'>North York Astronomical Association</a>
                                <a href="https://rasc.ca/" className='bg-secondary text-black p-1 w-fit'>Royal Astronomical Society of Canada (RASC)</a>
                                <a href="https://toronto.rasc.ca/" className='bg-secondary text-black p-1 w-fit'>RASC Toronto Centre</a>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

    );
}
