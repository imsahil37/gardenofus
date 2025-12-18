import { useMemo } from 'react'
import { motion } from 'framer-motion-3d'

export function Flower({ position }: { position: [number, number, number] }) {
  // Generate petals
  const petals = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const angle = (i / 5) * Math.PI * 2
      return {
        rotation: [0, 0, angle] as [number, number, number],
        color: '#ff99c8', // Soft Pink
      }
    })
  }, [])
  
  // Use unknown as an intermediate cast, but we need to satisfy eslint.
  // We can use a more specific type or just disable the rule for this specific line
  // because framer-motion-3d's types are indeed tricky to get perfect with React's strict types without 'any'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionGroup = motion.group as any

  return (
    <MotionGroup
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 1.5 }}
    >
      {/* Stem */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1]} />
        <meshStandardMaterial color="#88d498" />
      </mesh>

      {/* Flower Head */}
      <group position={[0, 1, 0]}>
        {/* Center */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#fce181" emissive="#fce181" emissiveIntensity={0.5} />
        </mesh>

        {/* Petals */}
        {petals.map((petal, i) => (
          <mesh key={i} position={[0, 0, 0]} rotation={petal.rotation}>
            <coneGeometry args={[0.1, 0.4, 32]} />
            <meshStandardMaterial color={petal.color} />
          </mesh>
        ))}
      </group>
    </MotionGroup>
  )
}
