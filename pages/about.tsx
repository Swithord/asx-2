import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import asx2425 from '../assets/asx2425.jpeg';
import Image from "next/image";
import { Separator } from "@/components/ui/separator";


export default function About() {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
        <Navbar />
        <div className='flex-grow flex flex-col gap-5 px-4 sm:gap-10 md:gap-15'>
            <div className="w-full flex justify-center items-center max-h-128">
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
                <div className='text-3xl md:text-4xl'>Our Mission</div>
                <Separator orientation="horizontal" className="bg-secondary" style={{ width: '25%' }} />
                <div className='text-xl md:text-2xl'>To <span className='text-primary'>educate</span>, <span className='text-primary'>excite</span>, and <span className='text-primary'>inspire</span> students, professionals, and the general public about astronomy and space.</div>
            </div>
            <div className='flex flex-col gap-5 w-full'>
                <div className='text-lg md:text-xl'>
                    ASX is a non-profit organization run by the University of Toronto undergraduate space community.
                </div>
                <div className='text-lg md:text-xl'>Since its inception in 2003, ASX has rapidly grown, organising numerous high-profile events with distinguished speakers, including astronauts, astronomers, and space entrepreneurs. ASX has also established partnerships with various organizations, including the Royal Astronomical Society of Canada, the Canadian Space Society, and the Canadian Space Agency.</div>
            </div>
            <div className='w-full flex flex-col gap-15 md:flex-row md:justify-between'>
                <div>
                    <div className='text-xl md:text-2xl text-primary'>Looking to sponsor us?</div>
                </div>
                <div>
                    <div className='text-xl md:text-2xl text-primary'>
                        Want to stay updated?
                    </div>
                </div>
                <div className='flex flex-col gap-3 items-center md:max-w-1/4'>
                    <div className='text-xl md:text-2xl text-primary'>Want to get involved?</div>
                    <div className='text-lg md:text-xl text-center'>
                        If you are a University of Toronto undergraduate student, you can run for any of the positions listed below. We hold elections for upcoming members <span className='text-primary'>near the end of the academic year</span>, so come to our events and get to know us until then!
                    </div>
                </div>
            </div>
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
