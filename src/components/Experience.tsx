import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Stars,
  Sparkles,
  Environment,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Island } from './Island'
import { MemoryOrb } from './MemoryOrb'
import { TheTree } from './TheTree'
import { Lantern } from './Lantern'
import { useStore } from '../store'
import { useEffect } from 'react'

const memories = [
  { id: 1, text: "Our first coffee", position: [2, 1, 2] },
  { id: 2, text: "The way you laugh", position: [-3, 1.5, 1] },
  { id: 3, text: "Late night talks", position: [1, 2, -3] },
  { id: 4, text: "Your warm hugs", position: [-2, 1, -2] },
  { id: 5, text: "I'm listening", position: [3, 1.5, -1] },
] as const

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const isMobile = size.width < 768
    const targetZ = isMobile ? 22 : 16
    const targetY = isMobile ? 10 : 8

    camera.position.set(0, targetY, targetZ)
    camera.updateProjectionMatrix()
  }, [camera, size.width])

  return null
}

function AutoRotate() {
    return <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 4}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
    />
}

function Scene() {
  const { memoryCount, totalOrbs, lanterns } = useStore()

  // Calculate growth level: 0.2 (stump) -> 1.0 (full)
  const growthLevel = Math.max(0.1, memoryCount / totalOrbs)

  return (
    <>
      <ResponsiveCamera />
      <AutoRotate />
      
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 5, -5]} color="#ff99c8" intensity={1.5} distance={20} />
      <pointLight position={[5, 5, 5]} color="#9d4edd" intensity={1.5} distance={20} />

      {/* Environment */}
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={300} scale={20} size={3} speed={0.4} opacity={0.5} color="#fce181" />
      <fog attach="fog" args={['#10002b', 10, 40]} />

      {/* World */}
      <group position={[0, -0.5, 0]}>
        <Island />
      </group>
      
      {memories.map((mem) => (
        <MemoryOrb
          key={mem.id}
          id={mem.id}
          memory={mem.text}
          position={mem.position as [number, number, number]}
        />
      ))}

      {/* Tree is always there, but grows */}
      <TheTree position={[0, -0.5, 0]} growthLevel={growthLevel} />

      {/* Lanterns */}
      {lanterns.map((l, i) => (
          <Lantern key={i} position={l.position} />
      ))}

      {/* Post Processing */}
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} radius={0.4} />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </>
  )
}

export function Experience() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, 16], fov: 45 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#10002b']} />
      <Scene />
    </Canvas>
  )
}
