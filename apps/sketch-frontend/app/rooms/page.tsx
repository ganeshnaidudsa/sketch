'use client'

import { ArrowRight, Layers, Share2, Users } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@/components/AuthProvider'
import { CreateRoomModal } from '@/components/CreateRoomModal'
import { Button } from '@/components/ui/button'
import { BACKEND_URL, FRONTEND_URL } from '@/config'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import type { Room as RoomType } from '@/types/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Room () {
  const [rooms, setRooms] = useState<RoomType[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [joiningRoomId, setJoiningRoomId] = useState<number | null>(null)
  const router = useRouter()

  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const {isLogged} = authContext;

  useAuthRedirect();

  async function fetchRooms () {
    try {
      console.log(`is logged ${isLogged}`)
      const token = localStorage.getItem('token')
      if(!token) return;
      setIsLoading(true)
      const response = await axios.get<{ rooms: RoomType[] }>(
        `${BACKEND_URL}/room`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setRooms(response.data.rooms)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinRoom = (slug: string, roomId: number) => {
    setJoiningRoomId(roomId)
    setTimeout(() => {
      router.push(`/canvas/${slug}`)
      setJoiningRoomId(null)
    }, 1000) 
  }

  useEffect(() => {
    if (!isModalOpen) {
      fetchRooms()
    }
  }, [isModalOpen])

  return (
    <div className='flex  flex-col'>
      <main className='flex-1'>
        <section className='py-12 bg-muted/50'>
          <div className='container mx-auto px-4'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-2xl font-bold'>Rooms</h2>
              <Button onClick={() => setIsModalOpen(true)}>
                Create New Room
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>

            {isLoading ? (
              <div className='grid md:grid-cols-3 gap-8'>
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className='bg-background p-6 rounded-lg shadow-sm animate-pulse'
                  >
                    <div className='h-6 bg-muted rounded mb-4 w-3/4'></div>
                    <div className='h-4 bg-muted rounded mb-2 w-1/2'></div>
                    <div className='h-4 bg-muted rounded mb-4 w-1/3'></div>
                    <div className='h-10 bg-muted rounded w-full'></div>
                  </div>
                ))}
              </div>
            ) : rooms && rooms.length > 0 ? (
              <div className='grid md:grid-cols-3 gap-8'>
                {rooms.map((room, index) => (
                  <div
                    key={room.id}
                    className='bg-background p-6 rounded-lg shadow-sm'
                  >
                    <div className='flex justify-between items-start mb-4'>
                      <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                        <Users className='h-6 w-6 text-primary' />
                      </div>
                      <div className='px-3 py-1 bg-muted rounded-full text-xs font-medium'>
                        ID: {index + 1}
                      </div>
                    </div>
                    <h3 className='text-xl font-medium mb-2'>
                      {room.admin.name}'s Room
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      Room Slug: {room.slug}
                    </p>
                    <div className='flex gap-3 mt-6'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1'
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${FRONTEND_URL}/canvas/${room.slug}`
                          )
                          toast.success('Link Copied Successfully!')
                        }}
                      >
                        <Share2 className='mr-2 h-4 w-4' />
                        Share
                      </Button>
                      <Button
                        size='sm'
                        className={`w-full`}
                        onClick={() => handleJoinRoom(room.slug, room.id)}
                        disabled={joiningRoomId === room.id}
                      >
                        {joiningRoomId === room.id ? 'Joining Room...' : 'Join Room'}
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12 h-[60vh] flex flex-col items-center justify-center'>
                <div className='h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4'>
                  <Layers className='h-8 w-8 text-muted-foreground' />
                </div>
                <h3 className='text-xl font-medium mb-2'>No Rooms Available</h3>
                <p className='text-muted-foreground mb-6'>
                  There are no active rooms at the moment. Create a new room to
                  get started.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <CreateRoomModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
