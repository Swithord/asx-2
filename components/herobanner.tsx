import { Separator } from "./ui/separator"
import banner from '../assets/banner.jpg';


export default function HeroBanner() {

    return (
        <div
            className="w-full h-48 md:h-96 pt-2 flex relative"
            style={{
            backgroundImage: `url(${banner.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
            }}
        >
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl font-bold">
                    <span className="hero-banner__highlight">A</span>stronomy &
                </h1>
                <h1 className="text-3xl md:text-5xl font-bold">
                    <span className="hero-banner__highlight">S</span>pace E
                    <span className="hero-banner__highlight">x</span>ploration
                </h1>
                <h1 className="text-3xl md:text-5xl font-bold">Association</h1>
                <Separator orientation="horizontal" />
                <h4 className="hero-banner__description text-xl md:text-2xl mt-2 text-primary">
                    UofT's astronomy outreach club
                </h4>
            </div>
            <div className="hidden sm:flex absolute bottom-4 right-4 md:bottom-8 md:right-8 flex-col items-end gap-2">
                <div className="text-lg w-full text-center">
                    Image of the Month
                </div>
                <div className='text-center border-2 border-gray-700 rounded-md p-2 w-full'>
                <div className='text-lg'>M16 - Eagle Nebula</div>
                <div>Credit: York</div>
                </div>
                <div className='text-secondary'>
                        (The next one can be yours!)
                    </div>
            </div>
        </div>

    );
}