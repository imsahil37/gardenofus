import { useState } from 'react'
import { Text, Float } from '@react-three/drei'
import { useStore } from '../store'
import { Flower } from './Flower'
import { motion } from 'framer-motion-3d'

interface MemoryOrbProps {
  position: [number, number, number]
  memory: string
  id: number
}

export function MemoryOrb({ position, memory }: MemoryOrbProps) {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const incrementMemory = useStore((state) => state.incrementMemory)

  const handleClick = () => {
    if (!clicked) {
      setClicked(true)
      incrementMemory()
    }
  }

  const MotionMesh = motion.mesh as any

  return (
    <group position={position}>
      {!clicked ? (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <MotionMesh
            onClick={handleClick}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
            whileHover={{ scale: 1.2 }}
            animate={{
                scale: hovered ? 1.2 : 1,
            }}
            >
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
                color={hovered ? "#ffc6ff" : "#e0aaff"}
                emissive={hovered ? "#ffc6ff" : "#e0aaff"}
                emissiveIntensity={hovered ? 3 : 1.5}
                toneMapped={false}
                transparent
                opacity={0.9}
            />
            </MotionMesh>
            {/* Inner glow core */}
            <mesh scale={0.2}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="white" />
            </mesh>
        </Float>
      ) : (
        <>
          <Flower position={[0, -0.5, 0]} />
          <group position={[0, 1, 0]}>
             <Text
              fontSize={0.3}
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#3c096c"
            >
              {memory}
            </Text>
          </group>
        </>
      )}
    </group>
  )
}
