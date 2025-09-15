import { useTrimesh } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Ramp() {
  const { scene } = useGLTF("/public assets/Ramp.glb");
  const geometry = scene.children[0].geometry;


  // Escalar manualmente los vértices
  const scaledVertices = useMemo(() => {
    const scaleFactor = 10; // Mismo factor que la escala visual
    const vertices = geometry.attributes.position.array;
    const scaled = new Float32Array(vertices.length);
    
    for (let i = 0; i < vertices.length; i++) {
      scaled[i] = vertices[i] * scaleFactor;
    }
    return scaled;
  }, [geometry]);

  const indices = useMemo(() => geometry.index.array, [geometry]);

  const [ref] = useTrimesh(() => ({
    args: [scaledVertices, indices],
    mass: 0,
    type: "Static",
    position: [-4, 0 ,-30],
    rotation: [0, 0.5 ,0]
  }));
  

  return <primitive object={scene} ref={ref} scale={10} />;
}