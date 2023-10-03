import { Canvas } from '@react-three/fiber'
import { type FC } from 'react'
import Box from './objects/Box'

const App: FC = () => {
  return (
    <div className='w-full h-screen bg-black' id='canvas-container'>
      <Canvas shadows>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default App
