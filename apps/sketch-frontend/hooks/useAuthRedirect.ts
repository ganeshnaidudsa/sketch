import { useContext, useEffect } from 'react'
import { AuthContext } from '@/components/AuthProvider'
import { useRouter, usePathname } from 'next/navigation'

export function useAuthRedirect () {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const pathname = usePathname()

  if (!authContext) {
    throw new Error('useAuthRedirect must be used within an AuthProvider')
  }

  const { setIsLogged, isLogged } = authContext

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogged(true);
    }
    const publicRoutes = ['/signup', '/signin']
    if (isLogged && publicRoutes.includes(pathname)) {
      router.push('/')
    }

    if (!isLogged && !publicRoutes.includes(pathname) && pathname != '/') {
      router.push('/signin')
    }
  }, [isLogged, pathname])

  return { isLogged }
}
