import { useMemo } from 'react'
import { motion } from 'framer-motion-3d'
import { Sparkles, Float } from '@react-three/drei'

export function TheTree({ position }: { position: [number, number, number] }) {
  // Create layers of leaves for a more structured tree
  const leaves = useMemo(() => {
    const items = []
    const colors = ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea']

    // Bottom layer (wider)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      items.push({
        position: [Math.sin(angle) * 1.5, 2.5, Math.cos(angle) * 1.5] as [number, number, number],
        scale: 1.2,
        color: colors[i % colors.length]
      })
    }

    // Middle layer
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + 0.5
      items.push({
        position: [Math.sin(angle) * 1, 3.5, Math.cos(angle) * 1] as [number, number, number],
        scale: 1.4,
        color: colors[(i + 2) % colors.length]
      })
    }

    // Top layer
    items.push({
      position: [0, 4.5, 0] as [number, number, number],
      scale: 1.6,
      color: '#ffb7b2'
    })

    return items
  }, [])

  const MotionGroup = motion.group as any

  return (
    <MotionGroup
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 3 }}
    >
      {/* Magic particles */}
      <Sparkles
        count={50}
        scale={6}
        size={4}
        speed={0.4}
        opacity={0.7}
        color="#ff99c8"
        position={[0, 3, 0]}
      />

      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.6, 3, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>

      {/* Leaves */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group>
            {leaves.map((leaf, i) => (
              <mesh key={i} position={leaf.position} scale={leaf.scale} castShadow receiveShadow>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  color={leaf.color}
                  roughness={0.3}
                  metalness={0.1}
                  emissive={leaf.color}
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
        </group>
      </Float>
    </MotionGroup>
  )
}
