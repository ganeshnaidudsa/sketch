import { BACKEND_URL } from '@/config'
import axios from 'axios'
type Shape =
    | {
        type: 'rectangle'
        x: number
        y: number
        width: number
        height: number
    }
    | {
        type: 'circle'
        centerX: number
        centerY: number
        radius: number
    }
    | {
        type: 'pencil'
        startX: number
        startY: number
        endX: number
        endY: number
    }
export async function fetchExsistingShapes(roomId: string) {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${BACKEND_URL}/room/chats/${roomId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const messages = res.data.messages
    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData
    })
    return shapes
}

export async function deleteAllShapes(roomId: string) {
    const token = localStorage.getItem('token')
    await axios.delete(`${BACKEND_URL}/room/chats/${roomId}`, {
        headers: {
            Authorization: `Beaerer ${token}`
        }
    })
}
