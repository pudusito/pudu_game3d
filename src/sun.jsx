import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export default function Modelsun() {
  const model = useGLTF('/public assets/Sun.glb') // ruta relativa a "public"
  // Caja física estática como colisión general del terreno
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [-70, 70, 200],
    args: [0, 3, 0], // tamaño del suelo (ajústalo al mapa visual)
  }))

  return <primitive ref={ref} object={model.scene} scale={20} />
}

// Precargar
useGLTF.preload('/public assets/Sun.glb');