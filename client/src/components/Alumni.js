import Link from "next/link";

export default function Alumni({ className, text, img, href = "#" }) {
    const imgSrc = img && img.length ? img : "/profile.png";

    return (
        <div className={`h-max w-[90vw] sm:w-[40vw] md:w-100 bg-white rounded-xl overflow-hidden ${className}`}>
            <img src={imgSrc} alt={text || "Alumni"} className="object-cover w-full h-76" />
            <div className="px-5 py-3 h-max font-poppins bg-white">
                <h1 className="line-clamp-2 text-slate-900 text-xl">{text}</h1>
            </div>

            <Link href={href} className="bg-yellow-300 py-2 rounded-b-xl flex items-center justify-center">
                <div className="text-bc-dblue font-semibold flex items-center gap-2">
                <span>Detail</span>
                <span className="material-symbols-rounded">chevron_right</span>
                </div>
            </Link>
        </div>
  );
}
