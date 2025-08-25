
import Image from 'next/image';
import logo from '../assets/asx_logo.jpg';

export default function ASXNavbar() {
    return (
        <nav className="bg-transparent text-white px-8 py-4 flex items-center gap-10 justify-between md:justify-center">
            <a href="/" className="flex items-center">
                <Image
                    src={logo}
                    alt="ASX Logo"
                    className="h-10"
                    width={40}
                    height={40}
                />
            </a>
            <button
                className="text-white focus:outline-none md:hidden"
                aria-label="Toggle navigation"
                onClick={() => {
                    const menu = document.getElementById("navbar-menu");
                    if (menu) menu.classList.toggle("hidden");
                }}
            >
                ☰
            </button>
            <div
                id="navbar-menu"
                className="hidden md:flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4"
            >
                <a href="/" className="text-xl hover:text-gray-300">
                    Home
                </a>
                <a href="/events" className="text-xl hover:text-gray-300">
                    Events
                </a>
                <a href="/sponsor" className="text-xl hover:text-gray-300">
                    Sponsorship
                </a>
                <a href="/about" className="text-xl hover:text-gray-300">
                    About
                </a>
            </div>
        </nav>
    );
}