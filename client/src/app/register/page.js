import Header from "@/components/Header"
import InputField from "@/components/InputField"
import Button from "@/components/Buttons"
import DatePicker from "@/components/DatePicker.js"
export const metadata = {
  title: "Register | Bastyasaka Alumni",
  description: "Bastyasaka Alumni — Register"
}

export default function Login() {
return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
        <Header/>
        <div className="container mx-auto flex items-center justify-center py-8 md:my-12 px-4 font-poppins">
            <div className="w-full max-w-3xl">
                <form className="bg-none sm:bg-white rounded-2xl sm:shadow-2xl overflow-hidden">
                    <div className="p-6 md:p-7">
                        <div className="space-y-4 sm:space-y-5">
                            <h1 className="text-slate-900 text-lg font-bold">Sign Up</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name-input" className="text-slate-700 text-sm font-medium">
                                        Nama Lengkap
                                        <span className="text-pink-500 ml-1">*</span>
                                    </label>
                                    <InputField id="name-input" placeholder="Masukkan nama lengkap" required></InputField>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password-input" className="text-slate-700 text-sm font-medium">
                                        Password
                                        <span className="text-pink-500 ml-1">*</span>
                                    </label>
                                    <InputField id="password-input" type="password" placeholder="Buat password" required></InputField>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="user-input" className="text-slate-700 text-sm font-medium">
                                        NIS
                                        <span className="text-pink-500 ml-1">*</span>
                                    </label>
                                    <InputField id="user-input" placeholder="Kode 6 angka" required></InputField>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="mail-input" className="text-slate-700 text-sm font-medium">
                                        E-mail
                                        <span className="text-pink-500 ml-1">*</span>
                                    </label>
                                    <InputField id="mail-input" placeholder="yourname@mail.com" required></InputField>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="mother-input" className="text-slate-700 text-sm font-medium">
                                    Nama Ibu
                                    <span className="text-pink-500 ml-1">*</span>
                                </label>
                                <InputField id="mother-input" placeholder="Masukkan nama ibu" required></InputField>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="birth-date-input" className="text-slate-700 text-sm font-medium">
                                    Tanggal Lahir
                                    <span className="text-pink-500 ml-1">*</span>
                                </label>
                                <DatePicker id="birth-date-input"></DatePicker>
                            </div>
                        </div>
                    </div>

                    <div className="sm:bg-slate-50 px-4 sm:px-6 md:px-8 py-4 border-t border-slate-400 md:border-slate-200">
                        <div className="flex flex-col gap-4">
                            <Button variant="primary" className="!w-full" type="submit">
                                Daftar Sekarang
                            </Button>
                            <div className="text-center">
                                <span className="text-slate-600 text-sm">Sudah punya akun? </span>
                                <a href="/login" className="text-bc-blue hover:text-blue-700 font-semibold text-sm transition-colors">
                                    Masuk di sini
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}

