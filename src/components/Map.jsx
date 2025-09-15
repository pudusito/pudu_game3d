import { useGLTF } from "@react-three/drei";
import { useTrimesh } from "@react-three/cannon";
import { useEffect, useState } from "react";

function CollisionMesh({ geometry, position, rotation }) {
  const vertices = geometry.attributes.position.array;
  const indices = geometry.index ? geometry.index.array : null;

  const [ref] = useTrimesh(() => ({
    args: indices ? [vertices, indices] : undefined,
    type: "Static",
    position,
    rotation,
  }));

  return <mesh geometry={geometry} ref={ref} visible={false} />;
}

export default function ModelMap() {
  const { scene } = useGLTF("/public assets/Map3.glb");
  const scaleFactor = 50;

  const [collisionMeshes, setCollisionMeshes] = useState([]);

  useEffect(() => {
    const meshes = [];
    scene.updateWorldMatrix(true, true); // asegura que las matrices estén actualizadas

    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Clonamos la geometría
        const scaledGeometry = child.geometry.clone();

        // Aplicamos la matriz mundial (posición, rotación y escala)
        scaledGeometry.applyMatrix4(child.matrixWorld);

        meshes.push({
          geometry: scaledGeometry,
          position: [0, 0, 0], 
          rotation: [0, 0, 0],
          name: child.name,
        });
      }
    });

    setCollisionMeshes(meshes);
  }, [scene, scaleFactor]);

  return (
    <>
      {/* Modelo visual con escala */}
      <primitive object={scene} scale={scaleFactor} position={[0, 1, 0]} rotation={[0,0,0]} />

      {/* Colisiones con geometrías transformadas */}
      {collisionMeshes.map(({ geometry, position, rotation, name }, i) => (
        <CollisionMesh
          key={name + i}
          geometry={geometry}
          position={position}
          rotation={rotation}
        />
      ))}
    </>
  );
}

useGLTF.preload("/public assets/Map3.glb");
