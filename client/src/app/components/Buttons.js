export function ButtonPrimary({className, children, type}) {
    return(
        <button type={type}
        className={`flex justify-center py-2 px-4  transition-colors rounded-xl cursor-pointer w-max ${className}`}>
        <h1 className={`font-poppins `}>
            {children}
        </h1>
        </button>
    )
}

export function ButtonSecondary({className, children, type}) {
    return(
        <button type={type}
        className={`flex justify-center py-2 px-4  transition-colors rounded-xl cursor-pointer w-max ${className}`}>
        <h1 className={`font-poppins text-slate-700 `}>
            {children}
        </h1>
        </button>
    )
}

export const BUTTON_VARIANTS = {
    primary: 'bg-linear-to-tr from-bc-dblue to-blue-900 hover:from-bc-blue hover:to-blue-800/80',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700'
};

export default function Button({children, variant, type, className}) {
    return(
        <button type={type}
        className={`flex justify-center py-2 px-4 transition-colors rounded-xl cursor-pointer w-max 
        ${className} 
        ${BUTTON_VARIANTS[variant]}`}>
        <h1 className={`font-poppins`}>
            {children}
        </h1>
        </button>
    )
}
