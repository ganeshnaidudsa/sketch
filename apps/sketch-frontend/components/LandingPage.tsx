import { Button } from '@/components/ui/button'
import { ArrowRight, Layers, Share2, Users } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage () {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <section className='py-20 md:py-32'>
          <div className='container mx-auto px-4 text-center'>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
              Collaborate on visual ideas in real-time
            </h1>
            <p className='mt-6 text-xl text-muted-foreground max-w-3xl mx-auto'>
              Create diagrams, wireframes, and illustrations with our intuitive
              whiteboard tool. Share and collaborate with your team in
              real-time.
            </p>
            <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/signup'>
                <Button size='lg' className='w-full sm:w-auto'>
                  Get started for free
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <Link href='#'>
                <Button
                  size='lg'
                  variant='outline'
                  className='w-full sm:w-auto'
                >
                  View demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className='py-16 bg-muted/50' id='features'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Why choose Drawify?
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='bg-background p-6 rounded-lg shadow-sm'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                  <Layers className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-medium mb-2'>Intuitive Drawing</h3>
                <p className='text-muted-foreground'>
                  Create beautiful diagrams with our easy-to-use drawing tools.
                  No design experience needed.
                </p>
              </div>
              <div className='bg-background p-6 rounded-lg shadow-sm'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                  <Users className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-medium mb-2'>
                  Real-time Collaboration
                </h3>
                <p className='text-muted-foreground'>
                  Work together with your team in real-time. See changes as they
                  happen.
                </p>
              </div>
              <div className='bg-background p-6 rounded-lg shadow-sm'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                  <Share2 className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-medium mb-2'>Easy Sharing</h3>
                <p className='text-muted-foreground'>
                  Share your drawings with anyone via a simple link. Export to
                  various formats.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='py-20'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-6'>Ready to start drawing?</h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-10'>
              Join thousands of teams who use Drawify to bring their ideas to
              life.
            </p>
            <Link href='/signup'>
              <Button size='lg'>Sign up for free</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
