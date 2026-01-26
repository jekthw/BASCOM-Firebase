import Image from "next/image";
import Navbar from "@/components/Navbar"
import SearchForm from "@/components/SearchForm"
import Button from "@/components/Buttons"
import Alumni from "@/components/Alumni"
import Footer from "@/components/Footer"
import { Input } from "postcss";
export const metadata = {
  title: "Profiles | Bastyasaka Alumni",
  description: "Bastyasaka Alumni — Profiles"
}

export default function Profile() {
  return (
    <div className="bg-slate-100 h-max">
      <Navbar/>
      <div className="bg-bc-blue w-full h-18"></div>
      <div className="flex flex-col px-6 2xl:px-55">
          <h1 className="text-5xl sm:text-5xl text-bc-blue underline font-bold mb-7 mt-28">
            Profil Alumni
          </h1>
          <SearchForm id="search" placeholder="Search for ..." className="w-86 md:w-96"></SearchForm>
      </div>

      
      <div className="px-6 w-full h-max py-20 relative flex flex-row justify-center ">
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>
          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>
          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>

          <div>
            <Alumni  
            text={"John Doe"}
            img={``}/>
          </div>


          
    
        </div>
        {/* <div className="bg-linear-270 from-slate-100 h-108 absolute z-50 w-32">

        </div> */}

      </div>
      <Footer></Footer>
    </div>
  );
}

