"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  // Temporary push from the cursor; decays back to zero
  ox: number
  oy: number
}

export function PolygonMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let animationFrameId: number

    const particleCount = 50
    const particles: Particle[] = []
    const connectionDistance = 150

    // Cursor interaction
    const repelRadius = 130
    const repelStrength = 0.6
    const cursorLinkDistance = 170
    const pointer = { x: 0, y: 0, active: false, alpha: 0 }

    const resizeCanvas = () => {
      const prevWidth = canvas.width
      const prevHeight = canvas.height
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Rescale particles so they stay spread across the new size
      if (prevWidth && prevHeight) {
        const sx = canvas.width / prevWidth
        const sy = canvas.height / prevHeight
        particles.forEach((p) => {
          p.x *= sx
          p.y *= sy
        })
      }

      // Resizing clears the canvas, so redraw immediately (needed for the static frame)
      draw()
    }

    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark")
      const lineRgb = isDark ? "100, 200, 255" : "59, 130, 246"
      const coreColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(59, 130, 246, 0.9)"

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lines from the cursor to nearby particles
      if (pointer.alpha > 0.01) {
        ctx.lineWidth = 1
        particles.forEach((p) => {
          const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y)
          if (distance < cursorLinkDistance) {
            const opacity = (1 - distance / cursorLinkDistance) * 0.5 * pointer.alpha
            ctx.strokeStyle = `rgba(${lineRgb}, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(pointer.x, pointer.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        })
      }

      // Connections
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3
            ctx.strokeStyle = `rgba(${lineRgb}, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Particles with glow and bright core
      particles.forEach((particle) => {
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 6)
        gradient.addColorStop(0, `rgba(${lineRgb}, 0.8)`)
        gradient.addColorStop(1, `rgba(${lineRgb}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = coreColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const update = () => {
      // Ease the cursor influence in and out
      pointer.alpha += ((pointer.active ? 1 : 0) - pointer.alpha) * 0.08

      particles.forEach((particle) => {
        // Push particles away from the cursor, stronger the closer they are
        if (pointer.alpha > 0.01) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < repelRadius && distance > 0.001) {
            const force = (1 - distance / repelRadius) ** 2 * repelStrength * pointer.alpha
            particle.ox += (dx / distance) * force
            particle.oy += (dy / distance) * force
          }
        }
        particle.ox *= 0.93
        particle.oy *= 0.93

        particle.x += particle.vx + particle.ox
        particle.y += particle.vy + particle.oy

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })
    }

    const animate = () => {
      update()
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        ox: 0,
        oy: 0,
      })
    }

    // Mouse only: touch has no hover, and reduced-motion users get a static mesh
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const rect = canvas.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      pointer.active = inside
      if (inside) {
        pointer.x = ((e.clientX - rect.left) / rect.width) * canvas.width
        pointer.y = ((e.clientY - rect.top) / rect.height) * canvas.height
      }
    }
    const handlePointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener("resize", resizeCanvas)

    if (reducedMotion) {
      draw()
    } else {
      window.addEventListener("pointermove", handlePointerMove)
      document.documentElement.addEventListener("pointerleave", handlePointerLeave)
      animate()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />
}
