import Image from "next/image";
import {Navbar} from '../component.js';
import {SearchForm} from '../component.js';
import {Article} from '../component.js';
import { Input } from "postcss";

export default function Profile() {
  return (
    <div className="bg-slate-100 h-screen">
      <Navbar/>
      <div className="bg-bc-blue w-full h-18"></div>
      <div className="flex flex-col px-6 2xl:px-55">
          <h1 className="text-5xl sm:text-5xl text-bc-blue underline font-bold mb-7 mt-28">
            Profil Alumni
          </h1>
          <SearchForm id="search" placeholder="Search for ..." className="w-86 md:w-96"></SearchForm>
      </div>

      
      <div className="px-6 2xl:px-49 w-full h-max py-20 relative flex flex-row justify-center ">
        <div className="w-full h-max rounded-xl overflow-x-auto flex *:shrink-0 gap-6 no-scrollbar snap-x *:snap-start   *:first:ps-6 *:last:pe-[calc(100%-25.5rem)]">
          <div>
            <Article 
            date={"10 Oktober 2025"} 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.jpg`}/>
          </div>

          <div>
            <Article 
            date={"10 Oktober 2025"} 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreetLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreetLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.png`}/>
          </div>

          <div>
            <Article 
            date={"10 Oktober 2025"} 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/banger.png`}/>
          
          </div>

          <div>
            <Article 
            date={"10 Oktober 2025"} 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.jpg`}/>
          </div>

          <div>
            <Article 
            date={"10 Oktober 2025"} 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreetLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreetLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.png`}/>
          </div>

          <div>
            <Article 
            date={"10 Oktober 2025"} 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/banger.png`}/>
          
          </div>

          
    
        </div>
        {/* <div className="bg-linear-270 from-slate-100 h-108 absolute z-50 w-32">

        </div> */}

      </div>
    </div>
  );
}

