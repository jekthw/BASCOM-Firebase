export default function Article({className, text, date, img}){
    return(
        <div className={`h-108 w-[90vw] sm:w-[40vw] md:w-100 bg-white rounded-xl ${className}`}>
        <img src={img} className="object-cover rounded-t-xl w-full h-76"></img>
        <div className="px-5 pt-3 h-32 font-poppins"> 
            <div className="text-sm/6 text-bc-gold">{date}</div>
            <h3 className="line-clamp-3 text-slate-900">{text}</h3>
        </div>
        </div>
    )
}
