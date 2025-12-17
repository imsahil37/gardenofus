import { MeshDistortMaterial } from '@react-three/drei'

export function Island() {
  return (
    <group>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[12, 12, 1, 64]} />
        <meshStandardMaterial
          color="#2d6a4f"
          roughness={0.8}
        />
      </mesh>
      {/* Top grass layer with distortion for texture */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
         <circleGeometry args={[11.5, 64]} />
         <MeshDistortMaterial
            color="#40916c"
            distort={0.3}
            speed={1.5}
            roughness={1}
          />
      </mesh>
    </group>
  )
}
