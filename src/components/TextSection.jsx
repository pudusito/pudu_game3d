import { Text } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Text3D() {

  const textRef = useRef()
  const [direction, setDirection] = useState(1)

  useFrame(() => {
    if (!textRef.current) return

    // Movimiento en X
    textRef.current.position.x += 0 * direction

    // Si llega a los bordes, invierte dirección
    if (textRef.current.position.x > -5) setDirection(-1)
    if (textRef.current.position.x < -5) setDirection(1)
  })


  return (
    <Text ref={textRef} 
      position={[-2,91,135]}     // Ajusta posición
      rotation={[0, 5 , 0]}
      fontSize={2}
      color="white"
      scale={1}
    >
    Start
    </Text>
  )
}
