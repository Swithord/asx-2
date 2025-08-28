
import Image from 'next/image';
import logo from '../assets/asx_logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ASXNavbar() {
    return (
        <nav className="bg-transparent text-foreground px-8 py-4 flex items-center gap-10 justify-between md:justify-center w-full">
            <a href="/" className="flex items-center">
                <Image
                    src={logo}
                    alt="ASX Logo"
                    className="h-10"
                    width={40}
                    height={40}
                />
            </a>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="text-foreground text-3xl focus:outline-none md:hidden"
                        aria-label="Open navigation menu"
                    >
                        ☰
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="md:hidden bg-gray-950 text-foreground min-w-[160px] p-2"
                >
                    <DropdownMenuLabel className="text-sm text-secondary">Navigation</DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1 border-gray-700" />

                    <DropdownMenuItem asChild>
                        <a href="/" className="block w-full px-2 py-2 text-left hover:bg-gray-700 rounded">Home</a>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <a href="/news" className="block w-full px-2 py-2 text-left hover:bg-gray-700 rounded">News</a>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <a href="/sponsor" className="block w-full px-2 py-2 text-left hover:bg-gray-700 rounded">Sponsorship</a>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <a href="/membership" className="block w-full px-2 py-2 text-left hover:bg-gray-700 rounded">Membership</a>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <a href="/about" className="block w-full px-2 py-2 text-left hover:bg-gray-700 rounded">About</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="/links" className="block w-full px-2 py-2 text-left hover:bg-gray-700 rounded">Links</a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div
                id="navbar-menu"
                className="hidden md:flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4"
            >
                <a href="/" className="text-xl hover:text-gray-300">
                    Home
                </a>
                <a href="/news" className="text-xl hover:text-gray-300">
                    News
                </a>
                <a href="/sponsor" className="text-xl hover:text-gray-300">
                    Sponsorship
                </a>
                <a href="/membership" className="text-xl hover:text-gray-300">
                    Membership
                </a>
                <a href="/about" className="text-xl hover:text-gray-300">
                    About
                </a>
                <a href="/links" className="text-xl hover:text-gray-300">
                    Links
                </a>
            </div>
        </nav>
    );
}