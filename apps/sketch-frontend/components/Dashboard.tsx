"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Download, Layers, Palette, PenTool, Share2, Star, Users2 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome to your Excalidraw workspace</h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Create, collaborate, and share your drawings in real-time. Join existing rooms or start a new canvas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms">
                <Button size="lg" className="w-full sm:w-auto">
                  Create new drawing room
                  <PenTool className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join existing room
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Recent Rooms</h3>
                <p className="text-muted-foreground">Continue working on your recent collaborative drawing rooms.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Saved Drawings</h3>
                <p className="text-muted-foreground">Access your saved drawings and sketches for quick editing.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Shared Rooms</h3>
                <p className="text-muted-foreground">
                  Join collaborative drawing rooms that others have invited you to.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Your Active Rooms</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((room) => (
                <Link href={`/room/${room}`} key={room} className="block">
                  <div className="bg-background border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-muted/30 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Layers className="h-12 w-12 opacity-30" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Drawing Room #{room}</h3>
                        <div className="flex -space-x-2">
                          {[1, 2].map((user) => (
                            <div
                              key={user}
                              className="h-6 w-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                            >
                              {user}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Last edited 2 hours ago</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">
                View all rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card p-8 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Upgrade to Excalidraw Pro</h2>
                    <p className="text-muted-foreground mb-6">
                      Unlock premium drawing tools, unlimited rooms, and advanced collaboration features.
                    </p>
                    <Button>
                      View Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-primary" />
                        <span>Unlimited rooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users2 className="h-4 w-4 text-primary" />
                        <span>More collaborators</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-primary" />
                        <span>Premium elements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-primary" />
                        <span>Export options</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

