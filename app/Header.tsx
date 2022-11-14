import Image from "next/image"
import Link from "next/link"
import LogoutButton from "./LogoutButton";
import {unstable_getServerSession} from 'next-auth/next'
    

async function Header() { 
    const session = await unstable_getServerSession();

    if (session) return (
        <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
            <div className="flex space-x-2 items-center">
                <Image 
                    className="rounded-full mx-2 object-contain"
                    height={10}
                    width={50}
                    src={session.user?.image!}
                    alt="Profile Picture"
                />

                <div>
                    <p className="text-blue-400">Logged in as:</p>
                    <p className="font-bold text-lg">{session.user?.name}</p>
                </div>
            </div>

            <LogoutButton />
        </header>
    )
  
    return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
        <div className="flex flex-col items-center">
            <div className="flex space-x-2 items-center">
                <Image src='https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png' alt="meta-logo" height={10} width={50} />
                
                <p className="text-blue-400">Welcome to Meta Messenger</p>
            </div>
        </div>
    </header>
  )
}

export default Header