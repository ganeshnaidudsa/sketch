'use client'
import CanvasRoom from '@/components/CanvasRoom'
import LoadingSpinner from '@/components/LoadingSpinner'
import { BACKEND_URL } from '@/config'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function CanvasPage ({ params }: { params: { slug: string } }) {
  const [roomId, setRoomId] = useState<number | null>(null)

  async function fetchRoomId () {
    try {
      const { slug } = await params
      const token = localStorage.getItem('token')
      if (!token) return
      const response = await axios.get(`${BACKEND_URL}/room/roomId/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRoomId(response.data.roomId)
    } catch (e) {
      toast('Invalid Slug !')
      console.error(e)
    }
  }

  useAuthRedirect()

  useEffect(() => {
    // console.log(TEMP);
    fetchRoomId()
  }, [])

  return (
    <>
      {roomId !== null ? (
        <CanvasRoom roomId={roomId.toString()} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}
