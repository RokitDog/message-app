import Pusher from "pusher";
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_SERVER_ID!,
    key: process.env.PUSHER_SERVER_KEY!,
    secret: process.env.PUSHER_SERVER_SECRET!,
    cluster: "eu",
    useTLS: true
})

export const clientPusher = new ClientPusher('76e4b00000e27a678bd4', {
    cluster: 'eu',
    forceTLS: true,
})