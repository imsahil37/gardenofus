import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion-3d'
import { Sparkles, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TheTreeProps {
  position: [number, number, number]
  growthLevel?: number // 0 to 1
}

export function TheTree({ position, growthLevel = 1 }: TheTreeProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Wind sway animation
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      // Gentle sway
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.02
    }
  })

  // Generate a cloud of crystal leaves
  const leaves = useMemo(() => {
    const items = []
    // Magical palette: Pink, Purple, Cyan, Deep Blue
    const colors = ['#f72585', '#b5179e', '#7209b7', '#4cc9f0', '#4361ee']

    const count = 100
    // Spiral distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)

      // Egg shape volume
      const r = 2.2 * Math.sqrt(Math.random()) + 0.5

      const x = r * Math.sin(phi) * Math.cos(theta)
      const z = r * Math.sin(phi) * Math.sin(theta)
      // Center vertical mass around 3.5
      const y = 3.5 + r * Math.cos(phi) * 1.8

      items.push({
        position: [x, y, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.25 + Math.random() * 0.35,
        color: colors[i % colors.length],
        delay: i * 0.015 // Staggered appearance
      })
    }

    return items
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionGroup = motion.group as any

  return (
    <MotionGroup
      ref={groupRef}
      position={position}
      animate={{ scale: growthLevel }}
      transition={{ type: 'spring', bounce: 0.5, duration: 2 }}
    >
      {/* Magic particles */}
      {growthLevel > 0.5 && (
        <Sparkles
          count={80}
          scale={8}
          size={6}
          speed={0.4}
          opacity={0.6}
          color="#feeafa"
          position={[0, 4, 0]}
        />
      )}

      {/* Trunk */}
      <mesh position={[0, 1.5 * growthLevel, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25 * growthLevel, 0.7 * growthLevel, 3 * growthLevel, 8]} />
        <meshStandardMaterial
            color="#2d1b2e" // Darker purple-ish wood
            roughness={0.9}
        />
      </mesh>

      {/* Crystal Leaves */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group>
            {leaves.map((leaf, i) => (
              <motion.mesh
                key={i}
                position={leaf.position}
                rotation={leaf.rotation}
                initial={{ scale: 0 }}
                animate={{ scale: leaf.scale * (growthLevel > 0.2 ? 1 : 0) }}
                transition={{
                    delay: leaf.delay,
                    type: "spring",
                    stiffness: 40,
                    damping: 10
                }}
                castShadow
                receiveShadow
              >
                {/* Gem shape */}
                <dodecahedronGeometry args={[1, 0]} />
                {/* Crystal material */}
                <meshPhysicalMaterial
                  color={leaf.color}
                  roughness={0.15}
                  metalness={0.2}
                  transmission={0.4}
                  thickness={1.5}
                  emissive={leaf.color}
                  emissiveIntensity={2.5} // High intensity for Bloom
                />
              </motion.mesh>
            ))}
        </group>
      </Float>

      {/* Internal Light Source for extra glow */}
      {growthLevel > 0.4 && (
        <pointLight
            position={[0, 3.5, 0]}
            intensity={3}
            distance={8}
            color="#d81159"
            decay={2}
        />
      )}
    </MotionGroup>
  )
}
