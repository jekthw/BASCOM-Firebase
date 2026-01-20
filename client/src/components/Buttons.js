import Link from "next/link";

export const BUTTON_VARIANTS = {
    primary: 'bg-linear-to-tr from-bc-dblue to-blue-900 hover:from-bc-blue hover:to-blue-800/80',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700'
};

export default function Button({ children, variant, type = "button", className = "", href, ...props }) {
    const classes = `flex justify-center py-2 px-4 transition-colors rounded-xl cursor-pointer w-max ${className} ${BUTTON_VARIANTS[variant]}`;
    const content = (
        <h1 className={`font-poppins`}>
            {children}
        </h1>
    );

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} {...props}>
            {content}
        </button>
    );
}
