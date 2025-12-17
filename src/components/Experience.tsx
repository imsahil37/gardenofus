import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Stars,
  Sparkles,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Island } from './Island'
import { MemoryOrb } from './MemoryOrb'
import { TheTree } from './TheTree'
import { useStore } from '../store'
import { useEffect } from 'react'

const memories = [
  { id: 1, text: "Our first coffee", position: [2, 0, 2] },
  { id: 2, text: "The way you laugh", position: [-3, 0.5, 1] },
  { id: 3, text: "Late night talks", position: [1, 1, -3] },
  { id: 4, text: "Your warm hugs", position: [-2, 0, -2] },
  { id: 5, text: "I'm listening", position: [3, 0.5, -1] },
] as const

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const isMobile = size.width < 768
    // Adjust camera position based on screen width
    // Move camera back on smaller screens to keep scene in view
    const targetZ = isMobile ? 16 : 10
    const targetY = isMobile ? 8 : 5

    camera.position.set(0, targetY, targetZ)
    camera.updateProjectionMatrix()
  }, [camera, size.width])

  return null
}

function Scene() {
  const isComplete = useStore((state) => state.isComplete)

  return (
    <>
      <ResponsiveCamera />
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minPolarAngle={Math.PI / 4}
      />
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 5, -5]} color="#ff99c8" intensity={2} />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#fce181" />
      <fog attach="fog" args={['#3c096c', 5, 20]} />

      {/* World */}
      <Island />
      
      {memories.map((mem) => (
        <MemoryOrb
          key={mem.id}
          id={mem.id}
          memory={mem.text}
          position={mem.position as [number, number, number]}
        />
      ))}

      {isComplete && <TheTree position={[0, -0.5, 0]} />}

      {/* Post Processing */}
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
      </EffectComposer>
    </>
  )
}

export function Experience() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 50 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#3c096c']} />
      <Scene />
    </Canvas>
  )
}
