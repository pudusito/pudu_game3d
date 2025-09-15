import { useGLTF } from '@react-three/drei';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useWheels } from './UseWheels';
import { useControls } from './UseControls';

import {useRef , forwardRef , useImperativeHandle} from 'react'

// Dimensiones del vehículo
function ModelCar(props, ref) {
    // Cargar el modelo del coche
  const mesh = useGLTF('/public assets/Car2.glb');

  const width = 1.5;
  const height = 0.5;
  const depth = 3.8;
  const front = depth * 0.27;
  const wheelRadius = 0.3;



  // Crear el chasis fisico con useBox  (ref controlado por cannon)
  const [chassisBody, chassisApi] = useBox(() => ({
    mass: 200,
    args: [width, height, depth],
    position: [-40,100,147],//posicion del vehiculo inicial // cambiar tambien el control RESET
    rotation:[0, Math.PI + 5 , 0]
  }));

  // Crear las ruedas y datos de rueda desde tu hook
  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  // Ref para el vehículo
  const vehicleRef = useRef();
  
  // Ref para la camara
  const primitiveRef = useRef();

  // Exponer el primitiveRef hacia afuera
  useImperativeHandle(ref, () => primitiveRef.current);


  // Crear el RaycastVehicle
  const [, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody: chassisBody,  // pasa la referencia del chasis
    wheels: wheels,
    wheelInfos: wheelInfos,
  }), vehicleRef);

  //conecta controles de usuario con la API del vehículo y del chasis
  useControls(vehicleApi, chassisApi);


  return (
    <group ref={vehicleRef}>
      {/* Chasis */}
      <group ref={chassisBody}>
        {/* Modelo visual del coche */}
        <primitive object={mesh.scene} ref={primitiveRef} scale={1} position={[0, -height / 1, 0]} />
      </group>

      {/* Ruedas visuales */}
      {wheels.map((wheel, index) => (
        <group key={index} ref={wheel}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}  > {/* castShadow proyecta sombra*/}
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

export default forwardRef(ModelCar);
// Precargar el modelo
useGLTF.preload('/public assets/Car2.glb');
