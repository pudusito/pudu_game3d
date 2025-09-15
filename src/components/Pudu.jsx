import { useGLTF } from '@react-three/drei'
import { useBox} from '@react-three/cannon'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils' // Importante para modelos animados
import { useMemo } from 'react'


export default function ModelPudu({position=[0,0,0], rotation=[0,0,0] }) {
    const gltf = useGLTF('/public assets/Pudu.glb')

      // Clonamos el modelo por instancia (muy importante)
    const clonedScene = useMemo(() => clone(gltf.scene), [gltf.scene])
    // Dimensiones cuerpo y ruedas
    const width = 0.9
    const height = 2
    const depth = 2.8
  
    // Cuerpo físico principal (caja)
    const [ref] = useBox(() => ({
      mass: 0,
      args: [width, height, depth],
      position,
      rotation,
    }))
  
    // Controles
  
    return (
      <>
        <group ref={ref} >
          <primitive object={clonedScene} scale={0.03} position={[0, -height / 2, 0]} />
        </group>
      </>
    )

}
// Precargar
useGLTF.preload('/public assets/Pudu.glb');
