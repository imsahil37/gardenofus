import { MeshDistortMaterial, MeshReflectorMaterial } from '@react-three/drei'

export function Island() {
  return (
    <group>
      {/* Main Ground */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial
          color="#1a4d2e"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Grassy Layer */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
         <circleGeometry args={[14, 64]} />
         <MeshDistortMaterial
            color="#2d6a4f"
            distort={0.2}
            speed={1}
            roughness={0.8}
          />
      </mesh>

      {/* Water / Mirror Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[100, 64]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#10002b"
          metalness={0.5}
          mirror={0.5}
          distortion={1} // Wet, organic look
        />
      </mesh>
    </group>
  )
}
