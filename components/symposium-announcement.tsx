export default function SymposiumAnnouncement() {
    return (
        <div className="w-full">
            <div className="relative rounded-xl bg-black border border-gray-800 p-8 md:p-10 shadow-lg overflow-hidden">
                {/* Animated background stars */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="stars"></div>
                    <div className="stars2"></div>
                    <div className="stars3"></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    {/* Badge */}
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                        <span className="text-yellow-200 text-sm md:text-base font-semibold">
                            NOW OPEN
                        </span>
                    </div> */}

                    {/* Main heading */}
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Announcing our 2026 Symposium!
                        </h2>
                        <p className="text-2xl md:text-3xl font-semibold text-primary">
                            "The Restless Universe: Cosmic Bursts and Transients"
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-md md:text-lg max-w-2xl">
                        Explore the most explosive phenomena in the cosmos with engaging talks by NASA scientists and professors from leading institutions!
                    </p>

                    {/* CTA Button */}
                    <a
                        href="https://www.eventbrite.com/e/the-restless-universe-cosmic-bursts-and-transients-asx-22nd-symposium-tickets-1982334742578"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg md:text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        <span>Register Now</span>
                        <svg 
                            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    {/* Additional info */}
                    <div>
                        <p className="text-sm md:text-base text-gray-400 mt-2">
                        📅 March 6th, 6:30pm at MC102, University of Toronto.
                    </p>
                    <p className="text-sm md:text-base text-gray-400">
                        ✅ Free for students. Light refreshments and telescope giveaway included.
                    </p>
                    </div>
                </div>
                
                <style jsx>{`
                    .stars, .stars2, .stars3 {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: transparent;
                    }
                    
                    .stars {
                        background-image: 
                            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 60px 70px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 50px 50px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 90px 10px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 170px 120px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 110px 140px, #eee, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 35px 95px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 145px 35px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 15px 160px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 185px 90px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 75px 170px, #eee, rgba(0,0,0,0));
                        background-repeat: repeat;
                        background-size: 200px 200px;
                        animation: zoom 15s ease-in-out infinite;
                        opacity: 0.6;
                    }
                    
                    .stars2 {
                        background-image: 
                            radial-gradient(1px 1px at 100px 150px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 20px 100px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 150px 50px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 180px 180px, #eee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 45px 25px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 220px 110px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 135px 200px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 65px 155px, #eee, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 195px 15px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 25px 220px, #fff, rgba(0,0,0,0));
                        background-repeat: repeat;
                        background-size: 250px 250px;
                        animation: zoom 25s ease-in-out infinite;
                        opacity: 0.4;
                    }
                    
                    .stars3 {
                        background-image: 
                            radial-gradient(1px 1px at 80px 120px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 160px 90px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 240px 200px, #eee, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 30px 60px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 200px 140px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 120px 280px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 270px 80px, #eee, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 55px 235px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 175px 45px, #fff, rgba(0,0,0,0));
                        background-repeat: repeat;
                        background-size: 300px 300px;
                        animation: zoom 35s ease-in-out infinite;
                        opacity: 0.5;
                    }
                    
                    @keyframes zoom {
                        0% {
                            transform: scale(1);
                            opacity: 0.3;
                        }
                        50% {
                            transform: scale(2);
                            opacity: 0.8;
                        }
                        100% {
                            transform: scale(1);
                            opacity: 0.3;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}
