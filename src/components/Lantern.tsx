import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export function Lantern({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  // Random speed for upward movement
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, [])
  const wobble = useMemo(() => Math.random() * Math.PI, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y += speed * delta
      ref.current.position.x += Math.sin(state.clock.elapsedTime + wobble) * 0.005
    }
  })

  return (
    <group ref={ref} position={position}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
                <meshStandardMaterial color="#ff9e00" emissive="#ff9e00" emissiveIntensity={2} toneMapped={false} />
            </mesh>
            <pointLight distance={3} intensity={1} color="#ff9e00" />
        </Float>
    </group>
  )
}
