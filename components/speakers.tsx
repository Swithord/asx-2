import Image from 'next/image';
import chrishadfield from '../assets/chrishadfield.jpg';
import michaelbrown from '../assets/michaelbrown.png';
import jeffreyhoffman from '../assets/jeffreyhoffman.jpg';
import saraseager from '../assets/saraseager.jpg';

import { StaticImageData } from 'next/image';
import { Separator } from './ui/separator';

interface SpeakerProps {
    name: string;
    bio: string;
    imageUrl: string | StaticImageData;
}

const Speaker = ({ name, bio, imageUrl }: SpeakerProps) => (
    <div className="flex flex-col items-center w-36 h-full md:w-48 gap-3">
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
            <Separator orientation='horizontal' />
            <h6 className="text-center md:text-lg">{bio}</h6>
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
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    return (
        <div className="container flex flex-col gap-5 sm:gap-10 md:gap-15 items-center">
            <div className='text-3xl md:text-4xl'>Past Speakers</div>
            {/* {speakers.map
                ((speaker, index) => (
                    <Speaker
                    
                        key={index}
                        name={speaker.name}
                        bio={speaker.bio}
                        imageUrl={speaker.imageUrl}
                    />
                ))} */}
            <div className="flex gap-10">
                {speakers.map((speaker, index) => (
                    <Speaker
                        key={index}
                        name={speaker.name}
                        bio={speaker.bio}
                        imageUrl={speaker.imageUrl}
                    />
                ))}
            </div>
            
        </div>
    );
}