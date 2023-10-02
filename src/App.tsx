import { Canvas } from '@react-three/fiber'
import { type FC } from 'react'

const App: FC = () => {
  return (
    <div className='w-full h-screen' id='canvas-container'>
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <directionalLight color='black' position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[4, 0.2, 0]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
