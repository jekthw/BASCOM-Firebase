import Image from "next/image";
import Navbar from "@/components/Navbar"
import SearchForm from "@/components/SearchForm"
import Button from "@/components/Buttons"
import Article from "@/components/Article"
import Footer from "@/components/Footer"
import Alumni from "@/components/Alumni";
import { Input } from "postcss";

export default function Home() {
  
  
  return (
    <div>
      <Navbar/>
      <div className="bg-[url('/smaga.png')] h-180 sm:h-200 w-full bg-center bg-cover relative flex justify-center">
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

          <h2 className="text-lg sm:text-xl w-[80vw]">
            Platform resmi penyedia informasi berita dan profil alumni SMA Negeri 3 Jombang
          </h2>
          <SearchForm id="search" placeholder="Search for ..." className="w-72 md:w-96"></SearchForm>
          
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-max bg-slate-100 py-20 relative">
        <div className="*:pb-24">
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl font-semibold text-bc-blue font-poppins">News Update</h1>
            <div className="w-[90vw] sm:w-[85vw] h-max rounded-xl overflow-x-auto flex *:shrink-0 gap-6 no-scrollbar snap-x *:snap-start">
                <div>
                    <Article 
                    date={"10 Oktober 2025"} 
                    text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
                    img={`/smaga.png`}/>
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
                  img={`/smaga.png`}/>
                
                </div>

                <div>
                  <Article 
                  date={"10 Oktober 2025"} 
                  text={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
                  img={`/smaga.png`}/>
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
                  img={`/smaga.png`}/>
                
                </div>
            </div>
            <Button variant="primary">
              More News
            </Button>
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl font-semibold text-bc-blue font-poppins">Our Alumnis</h1>
            <div className="w-[90vw] sm:w-[85vw] h-max rounded-xl overflow-x-auto flex *:shrink-0 gap-6 no-scrollbar snap-x *:snap-start">
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
            <Button variant="primary">
              More Profiles
            </Button>
          </div>
        </div>

        {/* <div className="bg-linear-270 from-slate-100 h-108 absolute z-50 w-32">

        </div> */}

      </div>
      <Footer/>
    </div>
  );
}

