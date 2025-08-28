import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import dunlap from '../assets/dunlap.jpg';
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"


export default function Sponsor() {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
        <Navbar />
        <div className='flex-grow flex flex-col gap-5 px-4 sm:gap-10 md:gap-15 items-center'>
          <div className='flex flex-col gap-5 items-center w-full max-w-3xl'>
            <div className='text-2xl md:text-4xl'>Why sponsor ASX?</div>
            <div className='text-lg md:text-xl text-center'>
              Sponsoring ASX means supporting a non-profit organization dedicated to promoting astronomy and space exploration. Your contribution allows us to continue hosting events <span className='text-primary'>free of charge</span>, promoting <span className='text-primary'>accessible</span> and <span className='text-primary'>equitable</span> education.
            </div>
            <div className='text-xl md:text-2xl w-full text-center'>Benefits to You
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex justify-between items-center">
                    <span className='text-lg md:text-xl'>Brand Exposure</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-left">
                    <p>Your name and logo will be seen by:</p>
                    <ul className='list-disc list-inside'>
                      <li>More than <span className='text-primary'>1200 members</span></li>
                      <li>Hundreds of <span className='text-primary'>event attendees</span> per year</li>
                      <li>Over <span className='text-primary'>2000 social media followers</span></li>
                      <li>Over <span className='text-primary'>1000 additional target audience</span> reached through collaborations/partnerships</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger className="flex justify-between items-center">
                    <span className='text-lg md:text-xl'>Greater visibility</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-left">
                    <p>As a sponsor, you'll gain increased visibility within the astronomy and space community. Your brand will be recognized at all of our events and on our promotional materials.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex justify-between items-center">
                    <span className='text-lg md:text-xl'>Community Impact</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-left">
                    <p>Your support enables us to promote STEM education across the community, and helps you build a positive reputation among thousands of high school and university students.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </div>
          </div>
          <div className='text-2xl md:text-4xl'>Our 2025-26 Sponsors</div>
          <div className="w-full max-w-3xl border rounded-lg border-gray-700 p-6 sm:p-8 flex gap-6 items-start">
            <div className="w-12 h-12 md:w-28 md:h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={dunlap?.src ?? dunlap}
                alt="Dunlap Institute for Astronomy & Astrophysics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-1 flex flex-col justify-between">
              <div className="text-lg md:text-xl font-semibold">
                Dunlap Institute for Astronomy & Astrophysics
              </div>
              <Badge variant="default" className='bg-primary text-black text-sm'>Neutron Star Sponsor</Badge>
              <div className="mt-2 text-sm md:text-base text-gray-500">
                The Dunlap Institute for Astronomy & Astrophysics at the University of Toronto is an endowed research institute with over 50 faculty, postdocs, students and staff, dedicated to innovative technology, groundbreaking research, world-class training, and public engagement.
              </div>
            </div>
          </div>
          <div className='text-2xl md:text-4xl flex items-center justify-center w-full'>
            <span>Sponsorship Tiers</span>
          </div>


            <div className="w-full max-w-[20rem] sm:max-w-[100%] min-w-0">
              <div className="w-full overflow-x-auto md:overflow-x-visible min-w-0">
                <Table className="table-fixed w-full min-w-[700px] md:min-w-0 text-sm sm:text-base lg:text-lg">
                  <TableCaption className="text-left">Sponsorship benefits by tier</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left min-w-0 whitespace-normal break-words">Benefit</TableHead>
                      <TableHead className="text-center min-w-0 whitespace-normal break-words">Gas Giant<br /><span className="text-base sm:text-lg md:text-xl">$200</span></TableHead>
                      <TableHead className="text-center min-w-0 whitespace-normal break-words">White Dwarf<br /><span className="text-base sm:text-lg md:text-xl">$500</span></TableHead>
                      <TableHead className="text-center min-w-0 whitespace-normal break-words">Red Giant<br /><span className="text-base sm:text-lg md:text-xl">$800</span></TableHead>
                      <TableHead className="text-center min-w-0 whitespace-normal break-words">Neutron Star<br /><span className="text-base sm:text-lg md:text-xl">$2500</span></TableHead>
                      <TableHead className="text-center min-w-0 whitespace-normal break-words">Black Hole<br /><span className="text-base sm:text-lg md:text-xl">$5000</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="min-w-0 whitespace-normal break-words">
                        Name, logo, and website link featured on our online list of sponsors.
                      </TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="min-w-0 whitespace-normal break-words">
                        Verbal thank you at our Annual Symposium in February.
                      </TableCell>
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="min-w-0 whitespace-normal break-words">
                        Name, logo, and verbal thank you at our student recruitment events in September.
                      </TableCell>
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="min-w-0 whitespace-normal break-words">
                        Name and logo featured in our printed symposium programme.
                      </TableCell>
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0">✓</TableCell>
                      <TableCell className="text-center min-w-0">✓</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="min-w-0 whitespace-normal break-words">
                        Custom advertisement distributed once per year via our monthly newsletter and social media.
                      </TableCell>
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0" />
                      <TableCell className="text-center min-w-0">✓</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="w-full max-w-3xl flex justify-center">
              <a href="/sponsorship.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-black text-lg md:text-xl p-6">Full Sponsorship Package</Button>
              </a>
            </div>
            <div className='text-lg md:text-xl'>
                We accept payment in the form of cheques and electronic deposits. <a className='bg-secondary text-background p-1' href='/links'>Contact us</a> and we will provide the required information!
              </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
