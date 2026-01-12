export default function InputField({id, placeholder, className, type, children}) {
    return(
        <div className={`flex flex-row ${className} group bg-slate-50 text-bc-dblue w-full ring-bc-blue ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 `}>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className=" py-2 px-4 outline-0 w-full ring-0"
        />
        {children}
        </div>
    )
}
