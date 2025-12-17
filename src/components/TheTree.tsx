import { useMemo } from 'react'
import { motion } from 'framer-motion-3d'
import { MeshDistortMaterial } from '@react-three/drei'

export function TheTree({ position }: { position: [number, number, number] }) {
  const leaves = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 1.5,
        2 + Math.random() * 1.5,
        (Math.random() - 0.5) * 1.5,
      ] as [number, number, number],
      scale: 0.8 + Math.random() * 0.5,
    }))
  }, [])

  const MotionGroup = motion.group as any

  return (
    <MotionGroup
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0.6, duration: 2 }}
    >
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 3, 16]} />
        <meshStandardMaterial color="#8d5524" roughness={0.8} />
      </mesh>

      {/* Leaves */}
      {leaves.map((leaf, i) => (
        <mesh key={i} position={leaf.position} scale={leaf.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#ffb7b2" // Soft pinkish leaves
            speed={2}
            distort={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </MotionGroup>
  )
}
