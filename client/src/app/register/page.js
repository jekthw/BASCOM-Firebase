import Image from "next/image";
import {Navbar, ButtonPrimary, ButtonSecondary, Form, Header} from '../component.js';
import { Input } from "postcss";

export default function Login() {
return (
    <div className="flex h-screen bg-slate-100">
        <Header/>
        <div className="m-auto flex flex-col items-center gap-5">
            <div className="w-96 h-90 bg-white flex flex-col justify-between shadow-xl relative p-6 font-poppins">
                <div className="flex flex-col gap-4">
                    <h1 className="text-slate-900 text-lg font-bold">Sign Up</h1>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-400 text-sm">NIS/Email
                            <span className="text-pink-500"> *</span>
                        </span>
                        <Form placeholder="NIS/Email"></Form>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-400 text-sm">Password
                            <span className="text-pink-500"> *</span>
                        </span>
                        <Form placeholder="Password" type="password">
                            <span className="material-symbols-rounded self-center text-center transition-all w-12 rounded-r-lg cursor-pointer">visibility</span>
                        </Form>
                        <a href="/" className="text-bc-blue text-xs underline ml-auto">Lupa Password?</a>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ButtonPrimary className="!w-full" type="submit">
                        Sign In
                    </ButtonPrimary>
                    <div className="flex gap-2 text-sm">
                        <span href="/" className="text-bc-blue">Datamu belum terdaftar?</span>
                        <a href="/register" className="text-blue-800 hover:text-blue-600 font-bold">Buat akun</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

