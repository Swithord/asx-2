import Image from 'next/image';
import chrishadfield from '../assets/chrishadfield.jpg';
import michaelbrown from '../assets/michaelbrown.png';
import jeffreyhoffman from '../assets/jeffreyhoffman.jpg';
import saraseager from '../assets/saraseager.jpg';
import luigigallo from '../assets/luigigallo.webp'
import adityavijaykumar from '../assets/adityavijaykumar.jpg'
import abigailfraeman from '../assets/abigailfraeman.jpg'
import richardbond from '../assets/richardbond.jpg'
import brucejakosky from '../assets/brucejakosky.jpg'
import lynnrothschild from '../assets/lynnrothschild.webp'

import { StaticImageData } from 'next/image';
import { Separator } from './ui/separator';

interface SpeakerProps {
    name: string;
    bio: string;
    imageUrl: string | StaticImageData;
}

const Speaker = ({ name, bio, imageUrl }: SpeakerProps) => (
    <div className="flex flex-col items-center justify-between w-36 h-full md:w-48 gap-3">
        <div className='flex flex-col gap-3'>
            <div className="w-36 h-36 md:w-48 md:h-48 overflow-hidden rounded-full flex items-center justify-center">
            <Image
                src={imageUrl}
                alt={`${name}'s picture`}
                className="object-cover w-full h-full"
                width={128}
                height={128}
            />
        </div>
            <h5 className="text-center text-lg md:text-xl">{name}</h5>
        </div>
        <div className='flex flex-col w-full gap-3'>
            <Separator orientation='horizontal' />
            <h6 className="text-center md:text-lg">{bio}</h6>
        </div>
    </div>
);

export default function Speakers() {
    const speakers = [
        {
            name: 'Chris A. Hadfield',
            bio: 'Canadian Astronaut',
            imageUrl: chrishadfield
        },
        // {
        //     name: 'Michael E. Brown',
        //     bio: 'Astronomer',
        //     imageUrl: michaelbrown
        // },
        // {
        //     name: 'Darlene Lim',
        //     bio: 'NASA Geobiologist and Exobiologist',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        // },
        // {
        //     name: 'Robert D. Richards',
        //     bio: 'Space Entrepreneur',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        // },
        // {
        //     name: 'Jaymie M. Matthews',
        //     bio: 'Astrophysicist',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        // },
        // {
        //     name: 'Robert Zubrin',
        //     bio: 'Aerospace Engineer',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        // },
        {
            name: 'Sara Seager',
            bio: 'Planetary Scientist',
            imageUrl: saraseager,
        },
        {
            name: 'Jeffrey A. Hoffman',
            bio: 'Astronaut',
            imageUrl: jeffreyhoffman
        },
        {
            name: 'Abigail Fraeman',
            bio: 'Planetary Scientist',
            imageUrl: abigailfraeman
        },
        {
            name: 'J. Richard Bond',
            bio: 'Astrophysicist',
            imageUrl: richardbond
        },
        {
            name: 'Luigi Gallo',
            bio: 'Astrophysicist',
            imageUrl: luigigallo,
        },
        {
            name: 'Aditya Vijaykumar',
            bio: 'Astrophysicist',
            imageUrl: adityavijaykumar
        },
        {
            name: 'Bruce Jakosky',
            bio: 'Geologist',
            imageUrl: brucejakosky
        },
        {
            name: 'Lynn Rothschild',
            bio: 'Astrobiologist',
            imageUrl: lynnrothschild
        }
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    const scrollContainer = (dir: number) => {
        const el = document.getElementById('speakers-scroll');
        if (!el) return;
        const amount = Math.max(el.clientWidth * 0.8, 300); // scroll by ~80% of viewport or at least 300px
        el.scrollBy({ left: dir * amount, behavior: 'smooth' });
    };

    return (
        <>
            {typeof window !== 'undefined' &&
                (() => {
                    // run after mount so DOM elements exist
                    setTimeout(() => {
                        const el = document.getElementById('speakers-scroll');
                        const leftBtn = document.getElementById('speakers-left-btn');
                        const rightBtn = document.getElementById('speakers-right-btn');
                        if (!el) return;
                        const update = () => {
                            if (leftBtn) leftBtn.style.display = el.scrollLeft > 0 ? 'flex' : 'none';
                            if (rightBtn)
                                rightBtn.style.display =
                                    el.scrollLeft + el.clientWidth < el.scrollWidth - 1 ? 'flex' : 'none';
                        };
                        update();
                        el.addEventListener('scroll', update, { passive: true });
                        window.addEventListener('resize', update);
                    }, 0);
                    return null;
                })()}

            <div className="container flex flex-col gap-5 sm:gap-10 md:gap-15 items-center">
                <div className="text-3xl md:text-4xl">Past Speakers</div>

                <div className="relative w-full overflow-visible">
                    {/* Left Button */}
                    <button
                        id="speakers-left-btn"
                        type="button"
                        aria-label="Scroll speakers left"
                        onClick={() => scrollContainer(-1)}
                        // start hidden until the script decides (override-safe)
                        style={{ display: 'none' }}
                        className="hidden md:flex absolute -left-2 sm:-left-4 md:-left-10 top-1/3 -translate-y-1/2 z-20 bg-white/90 dark:bg-slate-800/90 hover:bg-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg items-center justify-center text-2xl md:text-3xl leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-black"
                    >
                        <span className="leading-none align-middle">←</span>
                    </button>

                    <div
                        id="speakers-scroll"
                        className="w-full overflow-x-auto scroll-smooth"
                        role="region"
                        aria-label="Past speakers carousel"
                    >
                        <div className="inline-flex gap-5 w-max mx-auto py-4 sm:flex">
                            {speakers.map((speaker, index) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <Speaker name={speaker.name} bio={speaker.bio} imageUrl={speaker.imageUrl} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Button */}
                    <button
                        id="speakers-right-btn"
                        type="button"
                        aria-label="Scroll speakers right"
                        onClick={() => scrollContainer(1)}
                        // start hidden until the script decides
                        style={{ display: 'none' }}
                        className="hidden md:flex absolute -right-2 sm:-right-4 md:-right-10 top-1/3 -translate-y-1/2 z-20 bg-white/70 hover:bg-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center text-2xl md:text-3xl leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-b"
                    >
                        <span className="leading-none align-middle">→</span>
                    </button>
                </div>
            </div>
        </>
    );
}