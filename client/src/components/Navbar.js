 "use client";
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link'


export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.error("Logout failed", e);
        } finally {
            setMenuOpen(false);
            router.push("/login");
        }
    };
    return (
        <nav className="bg-bc-dblue/90 fixed flex flex-row items-center justify-between px-8 2xl:px-49 w-full h-18 end-0 z-50 backdrop-blur-sm backdrop-contrast-200">
        <div className="size-full flex flex-row gap-8 items-center">
            <img 
            src="/BastyasakaAlumni.png" 
            className="hidden sm:block sm:w-auto relative hover:animate-spin z-50" 
            />
            <img 
            src="/sm_BastyasakaAlumni.png" 
            className="block sm:hidden w-60 translate-y-5 relative hover:animate-spin z-50" 
            />
            <ul className="size-full hidden lg:flex flex-row items-center text-center  ">
            <NavButton url="/">Beranda</NavButton>
            <NavButton url="/profiles">Profil Alumni</NavButton>
            <NavButton url="/news">Berita</NavButton>
            <NavButton url="/about">About</NavButton>
            </ul>
        </div>
        <button 
        onClick={toggleMenu}
        className="material-symbols-rounded block lg:!hidden cursor-pointer">menu</button>
        
        {user ? (
          <div className="relative hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => setMenuOpen((s) => !s)}
              className="cursor-pointer h-max w-max font-bold font-poppins hover:text-lg transition-all text-yellow-300 flex items-center gap-2"
              aria-expanded={menuOpen}
            >
              <span className='underline'>{user.email}</span>
              <span className={`${menuOpen? "rotate-180":"rotate-0"} transition-all material-symbols-rounded text-sm`}>expand_more</span>
            </button>

            {menuOpen && (
              <div className="absolute translate-y-3/4 right-0 mt-2 w-50 bg-white rounded-lg shadow-lg z-50 overflow-hidden font-poppins">
                <Link href="/user" className="block px-4 py-2 text-sm text-bc-dblue hover:bg-slate-100">Profile</Link>
                <button onClick={handleLogout} className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100 ">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" type="button" className="px-3 py-1 rounded-lg bg-yellow-300 h-max w-max font-bold font-poppins text-bc-dblue cursor-pointer hover:text-xl hover:translate-x-1.5 transition-all hidden lg:block">Login</Link>
        )}
        <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} user={user}/>
        </nav>
    );
}

function NavButton({ url, children, className }) {
    const isActive = usePathname() === url;
    return (
        <Link
        href={url}
        className={`flex items-center font-poppins p-4 hover:underline hover:text-yellow-300 hover:text-2xl transition-all 
            ${className} 
            ${isActive? `text-yellow-300 font-bold` : `text-white`}`}
        >
        {children}
        </Link>
    );
}

function Sidebar({isOpen, toggleMenu, user}){
    return(
        <>
        <div 
            className={`fixed left-0 top-0 bottom-0 w-screen h-screen bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={toggleMenu}
        />
        <nav className={`${isOpen ? `fixed translate-x-0` : `fixed translate-x-full`} h-screen w-64 bg-bc-dblue end-0 top-0 z-[61] transition-all`}>
            <div className={`h-[100dvh] w-64 flex flex-col justify-between items-center transition-all`}>
            <ul className="w-full h-max flex flex-col items-center text-center *:w-full *:even:bg-black/20">
                <NavButton url="/">Beranda</NavButton>
                <NavButton url="/profiles">Profil Alumni</NavButton>
                <NavButton url="/news">Berita</NavButton>
                <NavButton url="/about">About</NavButton>
            </ul>
            {user ? (
              <Link href="/user"className='py-2 mb-8 text-yellow-300 text-center font-bold  font-poppins underline'>{user.email}</Link>
            ) : (
              <Link 
                href="/login" 
                className="w-32 py-2 mb-8 rounded-lg bg-yellow-300 text-center font-bold text-bc-dblue"
              >
                Login
              </Link>
            )}
            </div>
        </nav>
        </>
    )
}
