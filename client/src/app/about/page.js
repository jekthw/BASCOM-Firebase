import {Navbar} from '../component.js';


export default function About() {
    return(
        <div>
            <Navbar/>
            <div className="bg-[url('/smaga.png')] h-screen w-full bg-center bg-cover relative flex justify-center">
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
                    
                </div>
            </div>
        </div>
    );
}