import { Sparkles, Float } from '@react-three/drei'
import { useStore } from '../store'

export function Celebration() {
  const { hasForgiven } = useStore()

  if (!hasForgiven) return null

  return (
    <group position={[0, 2, 0]}>
       {/* Intensive central glow/magic rising from the tree */}
      <Sparkles
        count={300}
        scale={[10, 20, 10]}
        size={15}
        speed={2}
        opacity={0.8}
        color="#ffd6ff"
      />

      {/* Wider magical atmosphere */}
      <Sparkles
        count={1000}
        scale={[40, 40, 40]}
        size={6}
        speed={1}
        opacity={0.6}
        color="#c8b6ff"
      />

      {/* Floating light to enhance the feeling of magic */}
       <Float speed={2} rotationIntensity={0} floatIntensity={2} floatingRange={[0, 2]}>
            <pointLight position={[0, 5, 0]} intensity={5} color="#e0aaff" distance={15} decay={2} />
       </Float>
    </group>
  )
}
