import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MoonStar, Telescope, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import speaker images
import chrishadfield from '../assets/chrishadfield.jpg';
import saraseager from '../assets/saraseager.jpg';
import jeffreyhoffman from '../assets/jeffreyhoffman.jpg';
import abigailfraeman from '../assets/abigailfraeman.jpg';
import richardbond from '../assets/richardbond.jpg';
import luigigallo from '../assets/luigigallo.webp'
import adityavijaykumar from '../assets/adityavijaykumar.jpg'
import brucejakosky from '../assets/brucejakosky.jpg'
import lynnrothschild from '../assets/lynnrothschild.webp'

// Import event images
import obs from '../assets/obs.jpg';
import startalk from '../assets/startalk.jpg';
import symposium from '../assets/symposium.png';

// Import social icons
import email from '../assets/email.svg';
import discord from '../assets/discord.svg';
import instagram from '../assets/instagram.svg';
import linkedin from '../assets/linkedin.svg';
import facebook from '../assets/facebook.svg';
import youtube from '../assets/youtube.svg';

// Import sponsor logo
import dunlap from '../assets/dunlap.jpg';

// Import hero background image
import asx2425 from '../assets/asx2425.jpeg';

import { StaticImageData } from 'next/image';

interface SpeakerCardProps {
  name: string;
  bio: string;
  imageUrl: string | StaticImageData;
}

const SpeakerCard = ({ name, bio, imageUrl }: SpeakerCardProps) => (
  <div className="flex flex-col items-center gap-3 w-28 md:w-36">
    <div className="w-28 h-28 md:w-36 md:h-36 overflow-hidden rounded-full flex items-center justify-center">
      <Image
        src={imageUrl}
        alt={`${name}'s picture`}
        className="object-cover w-full h-full"
        width={144}
        height={144}
      />
    </div>
    <div className="text-center">
      <h5 className="text-sm md:text-base font-semibold">{name}</h5>
      <p className="text-xs md:text-sm text-gray-500">{bio}</p>
    </div>
  </div>
);

interface EventCardProps {
  image: StaticImageData;
  title: string;
  description: string;
}

const EventCard = ({ image, title, description }: EventCardProps) => (
  <Card className="w-full relative overflow-hidden h-56 border-1 border-gray-700">
    <Image
      src={image}
      alt={title}
      fill
      style={{ objectFit: 'cover' }}
      className="absolute inset-0 z-0"
      priority
    />
    <div className="absolute top-4 left-4 z-10 bg-black/70 rounded-lg p-4 max-w-[70%]">
      <CardTitle className="text-primary mb-2 text-lg md:text-xl">{title}</CardTitle>
      <CardDescription className="text-white text-sm md:text-base">{description}</CardDescription>
    </div>
  </Card>
);

export default function SEDS() {
  const featuredSpeakers = [
    { name: 'Chris A. Hadfield', bio: 'Canadian Astronaut', imageUrl: chrishadfield },
    { name: 'Sara Seager', bio: 'Planetary Scientist', imageUrl: saraseager },
    { name: 'Jeffrey A. Hoffman', bio: 'Astronaut', imageUrl: jeffreyhoffman },
    { name: 'Abigail Fraeman', bio: 'Planetary Scientist', imageUrl: abigailfraeman },
    { name: 'J. Richard Bond', bio: 'Astrophysicist', imageUrl: richardbond },
    // { name: 'Luigi Gallo', bio: 'Astrophysicist', imageUrl: luigigallo },
  ];

  const events = [
    {
      image: symposium,
      title: 'Symposium',
      description: 'Our signature event - an annual symposium on the latest in space research, featuring distinguished speakers from the field.'
    },
    {
      image: obs,
      title: 'Observation Night',
      description: "Exclusive opportunities to visit McLennan's rooftop observatory and observe celestial objects through telescopes."
    },
    {
      image: startalk,
      title: 'StarTalk',
      description: 'Accessible, engaging lectures on a variety of topics in astronomy and space, delivered by researchers from UofT and beyond.'
    }
  ];

  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-8 md:gap-12 pb-8'>
        
        {/* Hero Section */}
        <div className="w-full flex justify-center items-center max-h-64 overflow-hidden relative">
          <div className="w-full max-w-[1280px] relative h-64">
            <Image
              src={asx2425}
              alt="ASX Team"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 28%' }}
            />
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end gap-3 px-4 z-10 pb-6 text-center">
              <Badge variant="default" className='bg-primary/50 text-white text-base md:text-lg px-4 py-2'>Welcome SEDS 2026!</Badge>
              <p className='text-base md:text-lg text-gray-300'>University of Toronto</p>
              <h1 className='text-2xl md:text-4xl font-semibold text-white'>
                Astronomy & Space Exploration Association
              </h1>
            </div>
          </div>
        </div>

        {/* <Separator className="bg-gray-700" /> */}

        {/* Mission Section */}
        <div className='flex flex-col gap-5 items-center w-full max-w-4xl'>
          <div className='flex items-center gap-3'>
            <MoonStar className="w-8 h-8 text-primary" />
            <h2 className='text-3xl md:text-4xl'>Our Mission</h2>
          </div>
          <div className='border rounded-lg border-gray-700 p-6 md:p-8'>
            <div className='text-lg md:text-xl'>
              To <span className='text-primary'>educate</span>, <span className='text-primary'>excite</span>, and <span className='text-primary'>inspire</span> students, professionals, and the general public about astronomy and space.
            </div>
          </div>
          <div className='text-base md:text-lg text-gray-400 text-center'>
            Founded in <span className='text-primary'>2003</span>, ASX is a non-profit organization run by the University of Toronto undergraduate space community. We organize numerous high-profile events with distinguished speakers, including astronauts, astronomers, and space entrepreneurs.
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Events Section */}
        <div className='flex flex-col gap-5 items-center w-full max-w-4xl'>
          <div className='flex items-center gap-3'>
            <Telescope className="w-8 h-8 text-primary" />
            <h2 className='text-3xl md:text-4xl'>Our Events</h2>
          </div>
          <div className='text-base md:text-lg text-center text-gray-400'>
            Our regular events are <span className='text-primary'>free</span> and <span className='text-primary'>open to the public</span>.
          </div>
          <div className="flex flex-col w-full gap-5">
            {events.map((event, index) => (
              <EventCard
                key={index}
                image={event.image}
                title={event.title}
                description={event.description}
              />
            ))}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Featured Speakers Section */}
        <div className='flex flex-col gap-5 items-center w-full max-w-4xl'>
          <h2 className='text-3xl md:text-4xl'>Past Speakers</h2>
          <p className='text-base md:text-lg text-center text-gray-400'>
            We've been honored to host world-renowned speakers from the space and astronomy community
          </p>
          <div className="w-full overflow-x-auto">
            <div className="flex gap-5 justify-center flex-wrap py-4">
              {featuredSpeakers.map((speaker, index) => (
                <SpeakerCard
                  key={index}
                  name={speaker.name}
                  bio={speaker.bio}
                  imageUrl={speaker.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Sponsorship Section */}
        <div className='flex flex-col gap-5 items-center w-full max-w-4xl'>
          <h2 className='text-3xl md:text-4xl'>Sponsorship</h2>
          <div className='text-base md:text-lg text-center text-gray-400'>
            ASX relies on external sponsorships to continue informing society about astronomy and space exploration. By sponsoring us, you or your company can be involved with a non-profit organization that strives to share the excitement of space with the public!
          </div>
          
          {/* Current Sponsor */}
          <div className="w-full border rounded-lg border-gray-700 p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={dunlap?.src ?? dunlap}
                alt="Dunlap Institute for Astronomy & Astrophysics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="text-lg md:text-xl font-semibold">
                Dunlap Institute for Astronomy & Astrophysics
              </div>
              <Badge variant="default" className='bg-primary text-black w-fit'>Neutron Star Sponsor</Badge>
              <div className="text-sm md:text-base text-gray-500">
                The Dunlap Institute at the University of Toronto is dedicated to innovative technology, groundbreaking research, world-class training, and public engagement.
              </div>
            </div>
          </div>

          <div className='text-center'>
            <p className='text-base md:text-lg mb-4'>
              Interested in becoming a sponsor?
            </p>
            <a 
              href="/sponsor" 
              className="inline-block bg-primary text-background px-6 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Learn More About Sponsorship
            </a>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Contact & Socials Section */}
        <div className='flex flex-col gap-5 items-center w-full max-w-4xl'>
          <div className='flex items-center gap-3'>
            <Mail className="w-8 h-8 text-primary" />
            <h2 className='text-3xl md:text-4xl'>Connect With Us</h2>
          </div>
          
          {/* Email */}
          <div className='flex gap-3 border rounded-lg border-gray-700 p-4 items-center w-full justify-center'>
            <Image
              src={email}
              alt="Email"
              className="object-cover w-6 h-6 md:w-8 md:h-8 icon-theme"
              width={30}
              height={30}
            />
            <a href="mailto:space.association.utasx@gmail.com" className="text-secondary text-sm md:text-base break-all">
              space.association.utasx@gmail.com
            </a>
          </div>

          {/* Socials Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full'>
            <a href="https://discord.gg/mTZMCKWsjr" className='flex gap-2 items-center border rounded-lg border-gray-700 p-4 hover:border-primary transition-colors'>
              <Image src={discord} alt="Discord" className="w-6 h-6 icon-theme" width={24} height={24} />
              <span className='text-secondary text-sm md:text-base'>Discord</span>
            </a>
            <a href="https://www.instagram.com/asx_uoft/" className='flex gap-2 items-center border rounded-lg border-gray-700 p-4 hover:border-primary transition-colors'>
              <Image src={instagram} alt="Instagram" className="w-6 h-6 icon-theme" width={24} height={24} />
              <span className='text-secondary text-sm md:text-base'>Instagram</span>
            </a>
            {/* <a href="https://www.linkedin.com/company/asx-society/" className='flex gap-2 items-center border rounded-lg border-gray-700 p-4 hover:border-primary transition-colors'>
              <Image src={linkedin} alt="LinkedIn" className="w-6 h-6 icon-theme" width={24} height={24} />
              <span className='text-secondary text-sm md:text-base'>LinkedIn</span>
            </a> */}
            {/* <a href="https://www.facebook.com/ASXAssoc" className='flex gap-2 items-center border rounded-lg border-gray-700 p-4 hover:border-primary transition-colors'>
              <Image src={facebook} alt="Facebook" className="w-6 h-6 icon-theme" width={24} height={24} />
              <span className='text-secondary text-sm md:text-base'>Facebook</span>
            </a> */}
            <a href="https://www.youtube.com/@astronomyandspaceexplorati5753" className='flex gap-2 items-center border rounded-lg border-gray-700 p-4 hover:border-primary transition-colors col-span-2 md:col-span-1'>
              <Image src={youtube} alt="YouTube" className="w-6 h-6 icon-theme" width={24} height={24} />
              <span className='text-secondary text-sm md:text-base'>YouTube</span>
            </a>
          </div>

          {/* Newsletter CTA */}
          <div className='text-center w-full mt-4'>
            <h3 className='text-xl md:text-2xl mb-3 text-primary'>Stay Updated!</h3>
            <p className='text-base md:text-lg mb-4'>
              Subscribe to our newsletter to stay updated on our events and announcements
            </p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScbjRnREhkQ-Mjv-mw8uGO5Jm03D7NjZTL_pEZQKMw2afP3Aw/viewform" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-background px-6 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Subscribe to Newsletter
            </a>
          </div>
        </div>

        <Separator className="bg-gray-700" />

      </div>
      <Footer />
    </div>
  );
}
