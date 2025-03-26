'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import axios from 'axios'
import { Layers } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SignupPage () {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useAuthRedirect()

  async function signUp () {
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:3031/api/v1/auth/signup',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      toast.success(response.data.message)

      router.push('/signin')
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
            <h1 className='text-2xl font-bold'>Create an account</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Sign up to start creating amazing diagrams
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              placeholder='Enter your name'
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
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
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className='space-y-2 mb-8'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='Create a password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Button className='w-full' onClick={signUp} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>

          <div className='mt-6 text-center text-sm'>
            <p className='text-muted-foreground'>
              Already have an account?{' '}
              <Link href='/signin' className='text-primary hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
