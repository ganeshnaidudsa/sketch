"use client"

import { Game } from "@/draw/Game"
import { deleteAllShapes } from "@/draw/http"
import type { Tool } from "@/types/types"
import { Circle, LogOut, Minus, Pencil, RectangleHorizontalIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { IconButton } from "./IconButton"

type Shape = "circle" | "rectangle" | "line" | "pencil"

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket
  roomId: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<Game>()
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil")
  const router = useRouter();

  useEffect(() => {
    game?.setTool(selectedTool)
  }, [selectedTool, game])

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket)
      setGame(g)

      return () => {
        g.destroy()
      }
    }
  }, [canvasRef])

  const clearCanvas = async () => {
    deleteAllShapes(roomId)
    game?.deleteCanvas()
  }

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ backgroundColor: "white" }}
      ></canvas>
      <TopBar
        currentShape={selectedTool}
        setCurrentShape={setSelectedTool}
        clearCanvas={clearCanvas}
        onExitRoom={()=>{
          router.push("/rooms")
        }}
      />
    </div>
  )
}

function TopBar({
  currentShape,
  setCurrentShape,
  clearCanvas,
  onExitRoom,
}: {
  currentShape: Shape
  setCurrentShape: (shape: Shape) => void
  clearCanvas: () => void
  onExitRoom: () => void
}) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg shadow-md z-10 scale-90">
        <div className="flex gap-2">
          <IconButton
            icon={<Pencil size={18} />}
            onClick={() => setCurrentShape("pencil")}
            activated={currentShape === "pencil"}
          />
          <IconButton
            icon={<Minus size={18} />}
            onClick={() => setCurrentShape("line")}
            activated={currentShape === "line"}
          />
          <IconButton
            icon={<RectangleHorizontalIcon size={18} />}
            onClick={() => setCurrentShape("rectangle")}
            activated={currentShape === "rectangle"}
          />
          <IconButton
            icon={<Circle size={18} />}
            onClick={() => setCurrentShape("circle")}
            activated={currentShape === "circle"}
          />
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

        <div className="flex gap-2">
          <IconButton icon={<X size={18} />} onClick={clearCanvas} className="hover:bg-red-100 text-red-600" />
          <IconButton icon={<LogOut size={18} />} onClick={onExitRoom} className="hover:bg-blue-100 text-blue-600" />
        </div>
      </div>
    </div>
  )
}
