import Button from "@/components/Buttons"

export default function WIP() {
    return(
        <div className="h-screen flex flex-col items-center justify-center gap-6 p-8 text-center bg-slate-100 font-poppins">
            <img
            src="/construction.svg"
            alt="Bascom — Coming Soon"
            className="max-w-xs w-3/5"
            />
            <h1 className="text-4xl font-semibold text-bc-dblue">Work in Progress</h1>
            <p className="text-gray-600">
            Coming Soon! This section is low priority for now.
            </p>
            <Button variant={"primary"} className={'!w-32'} href={"/"}>Home</Button>
        </div>
    )
}