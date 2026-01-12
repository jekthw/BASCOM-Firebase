import Image from "next/image";
import Navbar from "./components/Navbar.js"
import SearchForm from "./components/SearchForm.js"
import Button from "./components/Buttons.js"
import Article from "./components/Article.js"
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
      <div className="flex flex-col items-center w-full h-max bg-slate-100 py-20 relative">
        <div className="flex flex-col gap-6">
          <div className="w-[90vw] sm:w-[85vw] h-max rounded-xl overflow-x-auto flex *:shrink-0 gap-6 no-scrollbar snap-x *:snap-start">
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
          <Button variant="primary">
            Event Lainnya
          </Button>
        </div>
        <div className="h-screen w-screen"></div>
        {/* <div className="bg-linear-270 from-slate-100 h-108 absolute z-50 w-32">

        </div> */}

      </div>
    </div>
  );
}

