import asxlogo from '../assets/asx_logo.png';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export default function Footer() {

    return (
        <div className="flex mt-5 p-4 text-center justify-center gap-10 md:gap-20">
                    <div className="flex flex-col gap-5 items-center justify-center w-32 sm:w-48 md:w-56">
                        <div className='w-24 sm:w-32 md:w-48 flex justify-center'>
                            <Image src={asxlogo.src} alt="ASX Logo" width={128} height={128} />
                        </div>
                        <div className="flex items-center justify-center">
                            <p>&copy; {new Date().getFullYear()} UTASX. All rights reserved.</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-center justify-center'>
                        <div className='text-md md:text-lg'> Stay Updated </div>
                        <Separator orientation='horizontal' />
                        <div className='flex items-center gap-2'>
                            <a href="https://discord.gg/your-discord-link" target="_blank" rel="noopener noreferrer" className="text-md md:text-lg text-secondary">
                                Discord
                            </a>
                            <Badge variant={'default'} className='text-sm bg-white text-black'>New!</Badge>
                        </div>
                        <div>
                            <a href="https://www.facebook.com/ASXAssoc" target="_blank" rel="noopener noreferrer" className="text-md md:text-lg text-secondary">
                                Facebook
                            </a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com/asx_uoft/" target="_blank" rel="noopener noreferrer" className="text-md md:text-lg text-secondary">
                            Instagram
                            </a>
                        </div>
                        <div>
                            <a href="https://www.linkedin.com/company/asx-society/" target="_blank" rel="noopener noreferrer" className="text-md md:text-lg text-secondary">
                            LinkedIn
                            </a>
                        </div>
                        <div>
                           <a href="https://www.youtube.com/@astronomyandspaceexplorati5753" target="_blank" rel="noopener noreferrer" className="text-md md:text-lg text-secondary">
                            YouTube
                            </a> 
                        </div>
                        
                    </div>
                    <div className="flex-col justify-between hidden sm:flex">
                        <div>
                            <div className='text-md md:text-lg'>Sign up and access our newsletter</div>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLScbjRnREhkQ-Mjv-mw8uGO5Jm03D7NjZTL_pEZQKMw2afP3Aw/viewform" target="_blank" rel="noopener noreferrer" className="text-lg text-secondary">
                            Membership Registration Form
                            </a>
                        </div>
                        <div>
                            <div className='text-md md:text-lg'>21 Sussex Ave, Toronto, Ontario M5S 1J6, CA</div>
                            <div className='text-md md:text-lg'>space.association.utasx@gmail.com</div>
                        </div>
                        
                    </div>
            </div>
    );
}