import Image from "next/image"
import { Message } from "../tpings"
import {unstable_getServerSession} from 'next-auth/next'
import TimeAgo from 'react-timeago';

type Props = {
    message: Message
    session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

function MessageComponent({ message, session }: Props) {
    const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`} >
        <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
            <Image src={session?.user?.image || message.profilePic} height={10} width={50} alt="Profile Picture" className="rounded-full mx-2" />
        </div>

        <div>
            <span className={`text-[0.65rem] px-[2px] pb-[2px] block ${isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'}`}>{message.username}</span>

                <div className={`flex items-end`}>
                <div className={`px-3 py-2 rounded-lg w-fit text-white ${isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'}`}>
                    <p className="break-all">{message.message}</p>
                </div>

                <span className={`text-[0.65rem] block italic px-2 text-gray-300 ${isUser && 'text-right'}`}>
                    <TimeAgo date={new Date(message.created_at)} />
                </span>
            </div>
        </div>
    </div>
  )
}

export default MessageComponent