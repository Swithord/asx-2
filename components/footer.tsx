import asxlogo from '../assets/asx_logo.png';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export default function Footer() {

    return (
        <div className="flex flex-col items-center sm:flex-row mt-5 p-4 text-center justify-center gap-10 md:gap-20">
                    <div className="flex sm:flex-col gap-5 items-center justify-center w-full sm:w-48 md:w-56 order-3 sm:order-1">
                        <div className='w-24 sm:w-32 md:w-48 flex justify-center'>
                            <Image src={asxlogo.src} alt="ASX Logo" width={128} height={128} />
                        </div>
                        <div className="flex items-center justify-center">
                            <p>&copy; {new Date().getFullYear()} UTASX. All rights reserved.</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-center justify-center order-1 sm:order-2'>
                        <div className='text-md md:text-lg'> Stay Updated </div>
                        <Separator orientation='horizontal' className='hidden sm:block' />
                        <div className='flex flex-wrap justify-center sm:flex-col gap-3 items-center'>
                            <div className='flex items-center gap-2'>
                            <a href="https://discord.gg/vYsSzfnj" target="_blank" rel="noopener noreferrer" className="text-md md:text-lg text-secondary">
                                Discord
                            </a>
                            <Badge variant={'default'} className='text-sm bg-foreground text-background'>New!</Badge>
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
                        
                        
                    </div>
                    <div className="flex-col justify-between order-2 gap-10 flex sm:order-3">
                        <div className='flex flex-col gap-3 items-center'>
                            <div className='text-md md:text-lg'>Become a member and access our newsletter!</div>
                            <a href="/membership" className="text-lg bg-secondary w-fit p-1 text-background">
                            Membership Registration
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