import Link from "next/link";

export const ARTICLE_VARIANTS = {
    wide: 'h-max w-[90vw] sm:w-[40vw] md:w-full flex flex-row',
    compact: 'h-max w-[90vw] sm:w-[40vw] md:w-100 flex flex-col'
};

export default function Article({
    className = "",
    variant = "compact",
    text,
    date,
    img,
    href = "#",
    title
    }) {
    const imgSrc = img && img.startsWith('data:image') ? img : (img && img.length ? img : "/smaga.png");

    if (variant === "wide") {
        return (
        <article className={`h-max w-[90vw] lg:w-192 flex flex-row bg-white rounded-xl overflow-hidden gap-4 ${className} `}>
            <img src={imgSrc} alt={text || "News Article"} className="w-1/2 sm:w-2/5 object-cover h-64 rounded-l-xl" />
            <div className="p-4 flex flex-col justify-between w-full">
                <div className="font-poppins">
                    <h2 className=" font-bold text-2xl text-bc-blue">{title}</h2>
                    <h2 className="line-clamp-3 text-slate-900">{text}</h2>
                    <time className="text-sm text-bc-gold block">{date}</time>
                </div>
                <Link href={href} className="flex justify-center items-center text-bc-dblue gap-2 bg-yellow-300 py-2 px-3 rounded-lg">
                    <span className="font-semibold">Detail</span>
                    <span className="material-symbols-rounded">chevron_right</span>
                </Link>
            </div>
        </article>
        );
    }

    // compact (default)
    return (
        <article className={`h-max w-[90vw] sm:w-[40vw] md:w-100 bg-white rounded-xl overflow-hidden ${className}`}>
            <img src={imgSrc} alt={text || "News Article"} className="object-cover w-full h-76"></img>
            <div className="px-5 pt-3 h-32 font-poppins"> 
                <div className="text-sm/6 text-bc-gold">{date}</div>
                <h3 className="line-clamp-3 text-slate-900">{text}</h3>
            </div>
            <Link href={href} className="bg-yellow-300 py-2 flex items-center justify-center">
                <div className="text-bc-dblue font-semibold flex items-center gap-2">
                <span>Detail</span>
                <span className="material-symbols-rounded">chevron_right</span>
                </div>
            </Link>
        </article>
    );
}
