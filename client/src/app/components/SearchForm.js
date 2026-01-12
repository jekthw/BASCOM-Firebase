export default function SearchForm({ id, placeholder, className}) {
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