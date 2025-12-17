import { MeshDistortMaterial } from '@react-three/drei'

export function Island() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[10, 64]} />
      <MeshDistortMaterial
        color="#88d498"
        distort={0.2}
        speed={1}
        roughness={1}
      />
    </mesh>
  )
}
