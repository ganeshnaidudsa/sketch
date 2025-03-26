'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthUser () {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(!token)
    if (!token) {
      router.push('/signin')
    } 
  }, [])
  return <></>
}
