"use client";
import { usePathname } from "next/navigation";



export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-bc-dblue/90 fixed flex flex-row items-center justify-between px-6 2xl:px-49 w-full h-18 end-0 z-50 backdrop-blur-sm">
      <div className="size-full flex flex-row gap-8 items-center">
        <img src="/BastyasakaAlumni.png" className="h-[60%] hidden sm:block  relative hover:animate-[spin_0.2s_linear_infinite] z-50"/>
        <ul className="size-full hidden lg:flex flex-row items-center text-center  ">
          <NavButton url="/">Beranda</NavButton>
          <NavButton url="/profiles">Profil Alumni</NavButton>
          <NavButton url="/bascom">Komunitas</NavButton>
          <NavButton url="/about">About</NavButton>
        </ul>
      </div>
      <button className="material-symbols-rounded block lg:!hidden cursor-pointer">menu</button>
      
      <a href="/login" type="button" className="px-3 py-1 rounded-lg bg-yellow-300 h-max w-max font-bold font-poppins text-bc-dblue cursor-pointer hover:text-xl hover:translate-x-1.5 transition-all hidden lg:block">Login</a>
      <Sidebar/>
    </nav>
  );
}

export function SearchForm({ id, placeholder, className}) {
  return(
    <form className={`flex flex-row ${className}`}>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="bg-slate-50 text-bc-dblue w-full py-2 px-6 rounded-l-xl text-xl z-10"
      />
      <button
        type="submit"
        className="w-[18%] py-2 px-6 flex items-center justify-center bg-yellow-300 rounded-r-xl text-bc-dblue cursor-pointer group"
      >
        <span className="material-symbols-rounded absolute group-hover:!text-3xl transition-all">search</span>
      </button>
    </form>
  )
}

function NavButton({ url, children, className }) {
  const isActive = usePathname() === url;
  return (
    <a
      href={url}
      className={`flex items-center font-poppins p-4 hover:underline hover:text-yellow-300 hover:text-2xl transition-all 
        ${className} ${
        isActive? `text-yellow-300 font-bold` : `text-white`
      }`}
    >
      {children}
    </a>
  );
}

function Sidebar(){
  return(
    <nav className="hidden fixed h-screen w-64 bg-bc-dblue end-0 top-0 z-50  flex-col justify-between items-center">
      <ul className="w-full h-max flex flex-col items-center text-center *:w-full *:odd:bg-black/20">
          <NavButton url="/">Beranda</NavButton>
          <NavButton url="/profiles">Profil Alumni</NavButton>
          <NavButton url="/bascom">Komunitas</NavButton>
          <NavButton url="/about">About</NavButton>
      </ul>
      <a href="/login" type="button" className="px-3 py-1 mb-12 rounded-lg bg-yellow-300 size-max end-0 font-bold font-poppins text-bc-dblue cursor-pointer hover:text-xl transition-all">Login</a>
    </nav>
  )
}

export function Article({className, text, date, img}){
  return(
    <div className={`h-max bg-white rounded-xl ${className}`}>
      <img src={img} className="object-cover rounded-t-xl w-full h-76"></img>
      <div className="px-5 pt-3 h-32 font-poppins"> 
        <div className="text-sm/6 text-bc-gold">{date}</div>
        <h3 className="line-clamp-3 text-slate-900">{text}</h3>
      </div>
    </div>
  )
}

