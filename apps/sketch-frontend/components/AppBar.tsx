'use client'
import { Button } from '@/components/ui/button'
import { Layers } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export default function AppBar () {
  const router = useRouter()
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const {isLogged, setIsLogged } = authContext;
  

  const pathName = usePathname()
  if (pathName.includes('/canvas')) {
    return null
  }

  const handleSignOut = () => {
    localStorage.removeItem('token') 
    setIsLogged(false)
    router.push('/') 
  }

  return (
    <header className='border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href={'/'}>
          <div className='flex items-center gap-2'>
            <Layers className='h-6 w-6 text-primary' />
            <span className='text-xl font-bold'>Drawify </span>
          </div>
        </Link>

        {!isLogged ? (
          <div className='flex items-center gap-4'>
            <Link
              href='/signin'
              className='text-sm font-medium hover:text-primary'
            >
              Sign in
            </Link>
            <Link href='/signup'>
              <Button>Sign up</Button>
            </Link>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link href='/rooms'>
              <Button
                variant={'outline'}
                className='text-blue-600 hover:text-blue-600 border-0'
              >
                Rooms
              </Button>
            </Link>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        )}
      </div>
    </header>
  )
}
