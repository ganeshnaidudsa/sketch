'use client'
import { AuthContext } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BACKEND_URL } from '@/config'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import axios from 'axios'
import { Layers } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function SigninPage () {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const { setIsLogged } = authContext
  useAuthRedirect()

  async function signIn () {
    setLoading(true)

    const userSignDetails = {
      password,
      email
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/signin`,
        userSignDetails,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = response.data
      const token = data.token
      localStorage.setItem('token', token)
      setIsLogged(true)
      toast.success(response.data.message)
      router.push('/')
    } catch (err: any) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4'>
        <div className='w-full bg-background p-8 rounded-lg shadow-sm border'>
          <div className='flex flex-col items-center mb-6'>
            <Link href='/' className='flex items-center gap-2 mb-4'>
              <Layers className='h-6 w-6 text-primary' />
              <span className='text-xl font-bold'>Drawify</span>
            </Link>
            <h1 className='text-2xl font-bold'>Welcome back</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Sign in to continue to Drawify
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              id='password'
              name='password'
              type='password'
              placeholder='Enter your password'
              required
            />
          </div>

          <div className='flex items-center justify-between mt-4'>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='remember'
                className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
              />
              <Label htmlFor='remember' className='text-sm font-normal'>
                Remember me
              </Label>
            </div>
            <Link href='#' className='text-sm text-primary hover:underline'>
              Forgot password?
            </Link>
          </div>

          <Button
            className='w-full mt-4'
            disabled={loading}
            onClick={() => {
              signIn()
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className='mt-6 text-center text-sm'>
            <p className='text-muted-foreground'>
              Don't have an account?{' '}
              <Link href='/signup' className='text-primary hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
