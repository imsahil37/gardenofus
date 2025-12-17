import { useState } from 'react'
import { Text } from '@react-three/drei'
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
        <MotionMesh
          onClick={handleClick}
          whileHover={{ scale: 1.2 }}
          animate={{
            y: [position[1], position[1] + 0.5, position[1]],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut',
          }}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#e0aaff"
            emissive="#e0aaff"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </MotionMesh>
      ) : (
        <>
          <Flower position={[0, 0, 0]} />
          <group position={[0, 2, 0]}>
             <Text
              fontSize={0.3}
              color="#3c096c"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#ffffff"
            >
              {memory}
            </Text>
          </group>
        </>
      )}
    </group>
  )
}
