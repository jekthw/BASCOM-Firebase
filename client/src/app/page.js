import Image from "next/image";
import {Navbar} from './component.js';
import {SearchForm} from './component.js';
import {Article} from './component.js';
import { Input } from "postcss";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="bg-[url('/smaga.png')] h-[45rem] sm:h-[50rem] w-full bg-center bg-cover relative flex justify-center">
    
        <div className="w-full px-6 md:px-0 md:w-[80vw] h-full flex flex-col gap-6 pb-20 font-poppins justify-center absolute  translate-y-18">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl ">
              Portal Alumni
            </h1>
            <h1 className="text-5xl sm:text-7xl font-bold text-pretty whitespace-normal">
              SMA Negeri 3 
              <span className="text-yellow-300"> Jombang</span>
            </h1>
          </div>

          <h2 className="text-lg sm:text-xl w-[80vw] sm:w-[50%]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
          </h2>
          <SearchForm id="search" placeholder="Search for ..." className="w-86 md:w-96"></SearchForm>
          
        </div>
      </div>
      <div className="px-6 2xl:px-49 w-full h-max bg-slate-100 py-20 flex justify-center">
        <div className="w-11/12 h-full rounded-xl grid grid-cols-3 gap-6">
          <Article 
          date={"10 Oktober 2025"} 
          text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
          img={`/smaga.jpg`}/>

          <Article 
          date={"10 Oktober 2025"} 
          text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreetLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreetLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
          img={`/smaga.png`}/>

          <Article 
          date={"10 Oktober 2025"} 
          text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
          img={`/banger.png`}/>
          
          <Article 
          date={"10 Oktober 2025"} 
          text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
          img={`/smaga.jpg`}/>
        </div>
      </div>
    </div>
  );
}

