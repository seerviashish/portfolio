import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { type Mesh } from 'three'
interface IBox {
  position?: [number, number, number]
}

const Box: React.FC<IBox> = ({ position }) => {
  const meshRef = useRef<Mesh>(null)

  const [hovered, hover] = useState<boolean>(false)
  const [clicked, click] = useState<boolean>(false)

  useFrame((_state, delta: number) => {
    if (meshRef?.current == null) {
      return
    }
    meshRef.current.rotation.x += delta
  })

  return (
    <mesh
      position={position}
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => {
        click(!clicked)
      }}
      onPointerOver={(event) => {
        hover(true)
      }}
      onPointerOut={(event) => {
        hover(false)
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box
