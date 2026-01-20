import Icon from '@mdi/react';
import { mdiFacebook, mdiInstagram, mdiYoutube } from '@mdi/js';
import Link from 'next/link'

export default function Footer() {
    return(
        <div className="bg-bc-dblue w-full h-96 p-32 flex gap-20 font-poppins">
            <div className="flex flex-col whitespace-pre">
                <Link href="/" className="-translate-y-4">
                    <img src="/footerLogo.png" className="h-25"></img>
                </Link>
                <p>         Portal Alumni SMA Negeri 3 Jombang</p>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-yellow-300 text-2xl font-medium pb-2">Related Links</h3>
                <a href='https://web.sman3jombang.sch.id' className='hover:underline'>SMAGAJO Official Web</a>
                <a href='https://eraporaio.sman3jombang.sch.id' className='hover:underline'>Erapor SMAGAJO </a>
                <a href='https://lms.sman3jombang.sch.id' className='hover:underline'>Bastyasaka Belajar Online</a>
            </div>
            
            <div className="flex flex-col gap-1">
                <h3 className="text-yellow-300 text-2xl font-medium pb-2">Our Socials</h3>
                <a href='https://www.instagram.com/smagajoofficial/' className='inline-flex gap-2 items-center hover:underline'> 
                    <Icon path={mdiInstagram} size={0.8}/> 
                    @smagajoofficial
                </a>
                <a href='https://www.facebook.com/smanegeri3Jombang' className='inline-flex gap-2 items-center hover:underline'> 
                    <Icon path={mdiFacebook} size={0.8}/> 
                    SMA Negeri 3 Jombang
                </a>
                <a href='https://www.youtube.com/@kantorsman3jombang899' className='inline-flex gap-2 items-center hover:underline'>  
                    <Icon path={mdiYoutube} size={0.8}/> 
                    Kantor SMAN 3 Jombang
                </a>

            </div>
            
            
        </div>
    )
}