'use client'

import { WS_URL } from '@/config'
import { useEffect, useState } from 'react'
import { Canvas } from './Canvas'
import LoadingSpinner from './LoadingSpinner'

export default function CanvasRoom ({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const ws = new WebSocket(`${WS_URL}?token=${token}`)
    ws.onopen = () => {
      setSocket(ws)
      ws.send(
        JSON.stringify({
          type: 'JOIN',
          roomId
        })
      )
    }
  }, [])

  if (!socket) {
    return <LoadingSpinner/>
  }
  return <Canvas roomId={roomId} socket={socket} />
}
