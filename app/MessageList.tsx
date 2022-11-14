'use client'

import { useEffect, useRef } from 'react';
import useSWR from 'swr'
import { clientPusher } from '../pusher';
import { Message } from '../tpings';
import fetcher from '../utils/fetchMessages'
import MessageComponent from './MessageComponent';
import {unstable_getServerSession} from 'next-auth/next'

type Props = {
    initialMessages: Message[]
    session: Awaited<ReturnType<typeof unstable_getServerSession>>

}

function MessageList({initialMessages, session}: Props) {
    const { data: messages, error, mutate } = useSWR<Message[]>('/api/getMessages', fetcher);
    const messageRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        const channel = clientPusher.subscribe('messages');

        channel.bind('new-message', async (data: Message) => {
            // If you sent the message, no need to update cache
            if (messages?.find((message) => message.id === data.id)) return;

            if(!messages) {
                mutate(fetcher)
            } else {
                mutate(fetcher, {
                    optimisticData: [data, ...messages!],
                    rollbackOnError: true,
                })
            }
        })

        let messageBody = document.querySelector('html');
        messageBody!.scrollTop = messageBody!.scrollHeight - messageBody!.clientHeight;

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages, mutate, clientPusher])

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 xl:max-w-4xl mx-auto test flex flex-col-reverse' ref={messageRef}>
        {(messages || initialMessages).map(message => (
            <MessageComponent key={message.id} message={message} session={session}/>
        ))}
    </div>
  )
}

export default MessageList