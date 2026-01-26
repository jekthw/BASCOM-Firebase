import Image from "next/image";
import Navbar from "@/components/Navbar"
import SearchForm from "@/components/SearchForm"
import Button from "@/components/Buttons"
import Article from "@/components/Article";
import Footer from "@/components/Footer"
import { Input } from "postcss";
export const metadata = {
  title: "News | Bastyasaka Alumni",
  description: "Bastyasaka Alumni — News"
}

export default function Profile() {
  return (
    <div className="bg-slate-100 h-max">
      <Navbar/>
      <div className="bg-bc-blue w-full h-18"></div>
      <div className="flex flex-col px-6 2xl:px-55">
          <h1 className="text-5xl sm:text-5xl text-bc-blue underline font-bold mb-7 mt-28">
            News Update
          </h1>
          <SearchForm id="search" placeholder="Search for ..." className="w-86 md:w-96"></SearchForm>
      </div>

      
      <div className="px-6 2xl:px-49 w-full h-max py-20 relative flex flex-row justify-center ">
        <div className="flex flex-col gap-7">
          <Article 
            date={"10 Oktober 2025"}
            variant="wide" 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.png`}/>
          <Article 
            date={"10 Oktober 2025"}
            variant="wide" 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.png`}/>
          <Article 
            date={"10 Oktober 2025"}
            variant="wide" 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.png`}/>
          <Article 
            date={"10 Oktober 2025"}
            variant="wide" 
            text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
            img={`/smaga.png`}/>
    

          
    
        </div>
        {/* <div className="bg-linear-270 from-slate-100 h-108 absolute z-50 w-32">

        </div> */}

      </div>
      <Footer></Footer>
    </div>
  );
}

