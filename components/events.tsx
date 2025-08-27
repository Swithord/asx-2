import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import obs from '../assets/obs.jpg';
import startalk from '../assets/startalk.jpg';
import symposium from '../assets/symposium.png';

import Image, { StaticImageData } from 'next/image';

interface EventCardProps {
    image: StaticImageData;
    title: string;
    description: string;
}

const EventCard = ({ image, title, description }: EventCardProps) => (
    <Card className="w-full relative overflow-hidden h-72 sm:h-48 md:h-72 border-1 border-gray-700">
        <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 z-0"
            priority
        />
        <div className="absolute top-4 left-4 z-10 bg-black/60 rounded-lg p-4 max-w-[70%]">
            <CardTitle className="text-primary mb-2 text-xl md:text-2xl">{title}</CardTitle>
            <CardDescription className="text-white text-lg md:text-xl">{description}</CardDescription>
        </div>
    </Card>
);

export default function Events() {
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
        <div className="container flex flex-col gap-5">
            <div className='flex w-full flex-col md:flex-row gap-5 md:gap-15'>
                <div className='flex flex-col gap-5 md:w-1/3'>
                    <h1 className='text-3xl md:text-4xl'>Events</h1>
                    <div className='text-lg md:text-xl'>We organise a variety of events to engage with the community and share our passion for space.</div>
                    <div className='text-lg md:text-xl'>Our regular events are <span className='text-primary'>free</span> and <span className='text-primary'>open to the public</span>.</div>
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
            
        </div>
    )
}