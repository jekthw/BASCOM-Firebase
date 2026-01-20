 "use client"
import { useState } from "react";

export default function InputField({id, placeholder, className, type = "text", children, ...props}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className={`flex flex-row ${className} group bg-slate-50 text-bc-dblue w-full ring-bc-blue ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 `}>
            <input
                type={inputType}
                id={id}
                placeholder={placeholder}
                className=" py-2 px-4 outline-0 w-full ring-0"
                {...props}
            />
            {type === "password" ? (
                <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(s => !s)}
                    className="material-symbols-rounded self-center text-center transition-all w-12 rounded-r-lg cursor-pointer"
                >
                    {showPassword ? "visibility_off" : "visibility"}
                </button>
            ) : children}
        </div>
    )
}
