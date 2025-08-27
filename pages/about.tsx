import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import asx2425 from '../assets/asx2425.jpeg';
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import telescope from '../assets/telescope.svg';
import planet from '../assets/planet.svg';
import { Button } from "@/components/ui/button";


export default function About() {
  return (
    <div className='max-w-7xl mx-auto'>
        <Navbar />
      <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
        <div className='flex-grow flex flex-col gap-10 px-4 md:gap-10 items-center'>
            <div className="w-full flex justify-center items-center max-h-128 overflow-hidden">
                <div className="w-full max-w-[1280px]">
                    <Image
                        src={asx2425}
                        alt="ASX 2425"
                        className="object-cover w-full h-auto"
                        width={1280}
                        height={720}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-5 w-full items-center'>
                <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 bg-black'>
                  <div className='text-3xl md:text-4xl'>Our Mission</div>
                </div>
               <div className='border rounded-lg border-gray-700 p-6 sm:p-8 pt-10'>
                  <div className='text-xl md:text-2xl'>To <span className='text-primary'>educate</span>, <span className='text-primary'>excite</span>, and <span className='text-primary'>inspire</span> students, professionals, and the general public about astronomy and space.</div>
                </div>
                
            </div>
            <Image
                src={planet}
                alt="Planet"
                className="object-cover w-8 h-8 filter brightness-0 invert"
                width={30}
                height={30}
            />
            <div className='flex flex-col gap-5 w-full'>
                <div className='text-lg md:text-xl'>
                    ASX is a non-profit organization run by the University of Toronto undergraduate space community.
                </div>
                <div className='text-lg md:text-xl'>Since its inception in 2003, ASX has rapidly grown, organising numerous high-profile events with distinguished speakers, including astronauts, astronomers, and space entrepreneurs. ASX has also established partnerships with various organizations, including the Royal Astronomical Society of Canada, the Canadian Space Society, and the Canadian Space Agency.</div>
            </div>
            <div className='w-full flex flex-col gap-15 md:flex-row md:justify-between'>
                <div className='flex flex-col gap-3 items-center pt-10 md:pt-0 md:max-w-1/4'>
                    <div className='text-xl md:text-2xl text-primary'>Looking to sponsor us?</div>
                    <div className='text-lg md:text-xl text-center'>
                       ASX relies heavily on external sponsorships in order to continue informing today's society about astronomy and space exploration. By sponsoring us, you or your company can be involved with a non-profit organization that strives to share the excitement of space with the public!
                    </div>
                </div>
                <div className='flex flex-col gap-3 items-center md:max-w-1/4'>
                    <div className='text-xl md:text-2xl text-primary'>
                        Want to stay updated?
                    </div>
                    <div className='text-lg md:text-xl text-center'>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScbjRnREhkQ-Mjv-mw8uGO5Jm03D7NjZTL_pEZQKMw2afP3Aw/viewform" className="bg-secondary text-black p-1">Subscribe to our Newsletter</a> to stay updated on our events and announcements. We send out emails once a month, and you can unsubscribe at any time.
                    </div>
                </div>
                <div className='flex flex-col gap-3 items-center md:max-w-1/4'>
                    <div className='text-xl md:text-2xl text-primary'>Want to get involved?</div>
                    <div className='text-lg md:text-xl text-center'>
                        If you are a University of Toronto undergraduate student, you can run for any of the positions listed below. We hold elections for upcoming members <span className='text-primary'>near the end of the academic year</span>, so come to our events and get to know us until then!
                    </div>
                </div>
            </div>
            <Image
                src={telescope}
                alt="Telescope"
                className="object-cover w-8 h-8 filter brightness-0 invert"
                width={30}
                height={30}
            />
            <div className='flex flex-col gap-5 w-full items-center'>
                <div className='text-3xl md:text-4xl'>Meet the Team</div>
                <Separator orientation="horizontal" className="bg-secondary" style={{ width: '25%' }} />
                
            </div>
        </div>
        <Footer />
    </div>
    </div>

  );
}
