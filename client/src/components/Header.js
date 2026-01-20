export default function Header() {
    return(
        <div className="relative h-42 w-full bg-[url('/smaga.png')] bg-center bg-cover">
            <img 
            src="/BastyasakaAlumni.png" 
            className="hidden sm:block h-14 sm:w-auto z-50 absolute m-auto inset-0" 
            />
            <img 
            src="/sm_BastyasakaAlumni.png" 
            className="block sm:hidden h-24 translate-y-4  z-50 absolute m-auto inset-0" 
            />
        
        </div>
    )
}
