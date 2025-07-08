//SCENE

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Physics, Debug} from '@react-three/cannon';

import CameraDebugger from './camaradebugger';

import ModelMap from './map'
import ModelCar from './car';
import ModelPudu from './pudu';
import Modelsun from './sun';
import Text3D from './textsection';
import Ramp from './Ramp';
import MusicPlayer from './musica';

function CanvasFiber() {


  return (
    //body
    <div id= "bodydiv">

      <div id="marco">

{/* Canvas de React Three Fiber, que reemplaza el canvas vanilla */}
      <MusicPlayer></MusicPlayer>

      <Canvas id = "canvas"  camera={{ position: [0, 5, -35], fov: 60 }}> {/* X(W) , Y(H) , Z(DETRAS) */}


          <ambientLight intensity={0.5} />
          <directionalLight position={[-25, 10, 100]} />
        {/* <CameraDebugger></CameraDebugger>{/*  esto para ver la posicion de camara en consola*/} 
          {/**/} <OrbitControls /> {/*Esto te permite mover la cámara alrededor del objeto, como en un visor 3D.*/}

          <Stars></Stars>

          <Physics broadphase="SAP" gravity={[0, -2.5, 0]}>
            <Debug color="lime"> {/* Color de las colisiones */}

              <ModelMap></ModelMap>
              <ModelCar></ModelCar>

              <ModelPudu position={[0, 2.5, 0]} rotation={[0, 3.1, 0]}></ModelPudu>
              <ModelPudu position={[-5, 2.5, 0]} rotation={[0, 3, 0]}></ModelPudu>
              <ModelPudu position={[5, 2.5, 0]} rotation={[0, 3, 0]}></ModelPudu>

              <ModelPudu position={[0, 2.5, 10]} rotation={[0, 3.1, 0]}></ModelPudu>
              <ModelPudu position={[-5, 2.5, 10]} rotation={[0, 3, 0]}></ModelPudu>
              <ModelPudu position={[5, 2.5, 10]} rotation={[0, 3, 0]}></ModelPudu>

              <ModelPudu position={[0, 2.5, 20]} rotation={[0, 3.1, 0]}></ModelPudu>
              <ModelPudu position={[-5, 2.5, 20]} rotation={[0, 3, 0]}></ModelPudu>
              <ModelPudu position={[5, 2.5, 20]} rotation={[0, 3, 0]}></ModelPudu>

              <Modelsun></Modelsun>
              <Ramp></Ramp>

            </Debug>{/**/}
          </Physics>
          <Text3D></Text3D>
          
        </Canvas>
        </div>

    </div>
  );

}

export default CanvasFiber;
