import { useMemo } from 'react'
import { motion } from 'framer-motion-3d'
import { Sparkles, Float } from '@react-three/drei'

interface TheTreeProps {
  position: [number, number, number]
  growthLevel?: number // 0 to 1
}

export function TheTree({ position, growthLevel = 1 }: TheTreeProps) {
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
        color: colors[i % colors.length],
        layer: 0
      })
    }

    // Middle layer
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + 0.5
      items.push({
        position: [Math.sin(angle) * 1, 3.5, Math.cos(angle) * 1] as [number, number, number],
        scale: 1.4,
        color: colors[(i + 2) % colors.length],
        layer: 1
      })
    }

    // Top layer
    items.push({
      position: [0, 4.5, 0] as [number, number, number],
      scale: 1.6,
      color: '#ffb7b2',
      layer: 2
    })

    return items
  }, [])

  const MotionGroup = motion.group as any

  // Calculate scales based on growthLevel
  // If growthLevel is 0, scale is 0.
  // We can stagger the growth.

  // Actually, let's just use the growthLevel to scale the whole tree for now,
  // or maybe better, scale individual parts if we want it to "grow" as we collect orbs.
  // But usually this component is only shown when `isComplete` is true.

  // The user wants "Progressive Tree Growth".
  // So the tree should be visible from the start but small/sapling, and grow?
  // Or maybe it appears when completed?

  // If the plan says "Modify Store to pass ratio", I should assume the tree is ALWAYS rendered?
  // Or rendered but scales up.

  // Let's assume TheTree is rendered now even if not complete, but scales based on progress.

  return (
    <MotionGroup
      position={position}
      animate={{ scale: growthLevel }}
      transition={{ type: 'spring', bounce: 0.5, duration: 2 }}
    >
      {/* Magic particles - only show if grown enough */}
      {growthLevel > 0.5 && (
        <Sparkles
          count={50}
          scale={6}
          size={4}
          speed={0.4}
          opacity={0.7}
          color="#ff99c8"
          position={[0, 3, 0]}
        />
      )}

      {/* Trunk */}
      <mesh position={[0, 1.5 * growthLevel, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4 * growthLevel, 0.6 * growthLevel, 3 * growthLevel, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>

      {/* Leaves */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group>
            {leaves.map((leaf, i) => (
              <motion.mesh
                key={i}
                position={leaf.position as [number, number, number]}
                // Animate leaf scale based on growth too, maybe stagger?
                animate={{ scale: leaf.scale * (growthLevel > 0.2 ? 1 : 0) }}
                transition={{ delay: i * 0.1 }}
                castShadow
                receiveShadow
              >
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  color={leaf.color}
                  roughness={0.3}
                  metalness={0.1}
                  emissive={leaf.color}
                  emissiveIntensity={0.2}
                />
              </motion.mesh>
            ))}
        </group>
      </Float>
    </MotionGroup>
  )
}
