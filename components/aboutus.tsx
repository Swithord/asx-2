import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function StatisticsCard({ number, text }: { number: string; text: string }) {
    return (
        <Card className="w-36 h-full lg:w-48 text-center bg-transparent border-1 border-gray-700">
            <CardHeader>
                <CardTitle className="text-xl lg:text-3xl text-primary">{number}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-lg lg:text-xl text-foreground">{text}</CardDescription>
            </CardContent>
        </Card>
    );
}

export default function AboutUs() {
    const statistics = [
        {
            number: '2003',
            text: 'Founded'
        },
        {
            number: '1200',
            text: 'Members'
        },
        {
            number: '10+',
            text: 'Events per year'
        },
        {
            number: '500',
            text: 'Symposium Attendees'
        }
    ];
    return (
        <div className="container flex flex-col gap-5 sm:gap-10 md:gap-15 items-center">
            {/* <div className='text-3xl md:text-4xl'>About Us</div> */}
            <div className='text-3xl md:text-4xl'>Some stats about us:</div>
            <div className="w-full overflow-x-auto">
                <div className="inline-flex gap-5 w-max mx-auto sm:flex">
                    {statistics.map((statistic, index) => (
                        <div className='flex flex-col items-center justify-center' key={index}>
                            <StatisticsCard
                                number={statistic.number}
                                text={statistic.text}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>);
}