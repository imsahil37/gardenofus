import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Stars,
  Sparkles,
  Environment,
  ContactShadows
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Island } from './Island'
import { MemoryOrb } from './MemoryOrb'
import { TheTree } from './TheTree'
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
    // Adjust camera position based on screen width
    // Move camera back on smaller screens to keep scene in view
    const targetZ = isMobile ? 18 : 12
    const targetY = isMobile ? 8 : 6

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
        rotateSpeed={0.5}
      />
      
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 5, -5]} color="#ff99c8" intensity={1.5} distance={15} />
      <pointLight position={[5, 5, 5]} color="#9d4edd" intensity={1.5} distance={15} />

      {/* Environment */}
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={15} size={3} speed={0.4} opacity={0.5} color="#fce181" />
      <fog attach="fog" args={['#240046', 5, 25]} />

      {/* World */}
      <group position={[0, -0.5, 0]}>
        <Island />
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
      </group>
      
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
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.6} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  )
}

export function Experience() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 45 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#240046']} />
      <Scene />
    </Canvas>
  )
}
