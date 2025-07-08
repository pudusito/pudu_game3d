import { useGLTF } from '@react-three/drei';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useRef } from 'react';
import { useWheels } from './useWheels';
import { useControls } from './useControls';

export default function ModelCar() {
  // Dimensiones del vehículo
  const width = 1.5;
  const height = 1;
  const depth = 3;
  const front = depth * 0.27;
  const wheelRadius = 0.3;

  // Cargar el modelo del coche
  const mesh = useGLTF('/public assets/Car.glb');

  // Crear el chasis con useBox
  const [chassisBody, chassisApi] = useBox(() => ({
    mass: 150,
    args: [width, height, depth],
    position: [0, 3, -28],
  }));

  // Crear las ruedas
  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  // Ref para el vehículo
  const vehicleRef = useRef();

  // Crear el RaycastVehicle
  const [, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody: chassisBody,
    wheels: wheels,
    wheelInfos: wheelInfos,
  }), vehicleRef);

  // Usar los controles - sin asignar a variable
  useControls(vehicleApi, chassisApi);

  return (
    <group ref={vehicleRef}>
      {/* Chasis */}
      <group ref={chassisBody}>
        {/* Modelo visual del coche */}
        <primitive object={mesh.scene} scale={4} position={[0, -height / 2, 0]} />
      </group>

      {/* Ruedas visuales */}
      {wheels.map((wheel, index) => (
        <group key={index} ref={wheel}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}  >
            <cylinderGeometry args={[wheelRadius, wheelRadius, 0.20, 16]} />
            <meshStandardMaterial color="black" />
          </mesh>
          {/* Llanta */}
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}  >
            <cylinderGeometry args={[wheelRadius* 0.6, wheelRadius * 0.6, 0.22, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Precargar el modelo
useGLTF.preload('/public assets/Car.glb');