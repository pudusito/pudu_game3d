import { Text } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Text3D() {

  const textRef = useRef()
  const [direction, setDirection] = useState(1)

  useFrame(() => {
    if (!textRef.current) return

    // Movimiento en X
    textRef.current.position.x += 0.05 * direction

    // Si llega a los bordes, invierte dirección
    if (textRef.current.position.x > 5) setDirection(-1)
    if (textRef.current.position.x < -5) setDirection(1)
  })


  return (
    <Text ref={textRef} 
      position={[0, 15, 35]}     // Ajusta posición
      rotation={[0, Math.PI , 0]}
      fontSize={2}
      color="white"
      scale={1.5}

    >
     Salta al vacio!
    </Text>
  )
}
