import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export default function ModelMap() {
  const model = useGLTF('/public assets/Map.glb') // ruta relativa a "public"
  // Caja física estática como colisión general del terreno
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [0, 0, 0],
    args: [33, 3, 70], // tamaño del suelo (ajústalo al mapa visual)
  }))

  return <primitive ref={ref} object={model.scene} scale={1.5} position={[0, 0, 0]} />
}

// Precargar
useGLTF.preload('/public assets/Map.glb');