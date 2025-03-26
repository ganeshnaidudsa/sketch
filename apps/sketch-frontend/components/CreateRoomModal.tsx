'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface CreateRoomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRoomModal ({ open, onOpenChange }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  async function handleCreateRoom (e: React.FormEvent) {
    e.preventDefault()
    if (!roomName.trim()) return
    const token = localStorage.getItem('token')
    try {
      setIsCreating(true)
      const response = await axios.post(
        `${BACKEND_URL}/room/create`,
        { name: roomName }, // Request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success('Room Created Successfully !')
      onOpenChange(false)
    } catch (error) {
      //@ts-ignore
      toast.error(error!.response.data.message)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleCreateRoom}>
          <DialogHeader>
            <DialogTitle>Create New Room</DialogTitle>
            <DialogDescription>
              Enter a name for your new collaboration room.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='room-name' className='col-span-4'>
                Room Name
              </Label>
              <Input
                id='room-name'
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                className='col-span-4'
                placeholder='Enter room name'
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isCreating || !roomName.trim()}>
              {isCreating ? 'Creating...' : 'Create Room'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
