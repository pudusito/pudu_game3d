//SCENE
import { Canvas } from '@react-three/fiber';
import { Physics, Debug} from '@react-three/cannon';
import { Stats, Environment, PerspectiveCamera} from '@react-three/drei';

import { useState, useRef, Suspense} from 'react';
import Camera from './character/Camera';
import CameraDebugger from './utilitycomponents/CamaraDebugger';
import MusicPlayer from './utilitycomponents/MusicPlayer';

import ModelMap from './components/Map';
import Ground from './components/Ground'
import ModelCar from './character/Car';
import ModelPudu from './components/Pudu';
import ModelSun from './components/Sun';
import Text3D from './components/TextSection';
import Ramp from './components/Ramp';

export default function CanvasFiber() {
  
  const carRef = useRef();
  const [following, setFollowing] = useState(true);

    const [gameState, setGameState] = useState("start");

  return (

    <>
    <div id= "bodydiv">
      <div id="marco">
        
        {gameState === "playing" && (
          <>
            {/* Reproductor de música */}
            <MusicPlayer autoPlay={true} />
        
            {/* Botón de seguimiento */}
            <button
              onClick={() => setFollowing((f) => !f)}
              style={{
                position: "fixed",
                top: "1rem",
                right: "1rem",
                zIndex: 1000,
                width: window.innerWidth < 768 ? "40px" : "60px",
                height: window.innerWidth < 768 ? "35px" : "45px",
                fontSize: window.innerWidth < 768 ? "0.7rem" : "1rem",
                borderRadius: "50%",
                background: following ? "#0b8" : "#ff0000",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {following ? "CC ON" : "CC OFF"}
            </button>
          </>
        )}

        {/* ---------- PANTALLAS SEGÚN gameState ---------- */}
      {gameState === "start" && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
          <h1 className="text-4xl font-bold mb-6">🚗 Pudu Racing</h1>
          <button onClick={() => setGameState("playing")}
                  className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-700 transition">
            Start Game
          </button>
        </div>
      )}
      {gameState === "playing" && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-50">
          <button onClick={() => setGameState("start")}
                style={{
                position: "fixed",
                top: "1rem",
                left: "1rem",
                zIndex: 1000,
                width: window.innerWidth < 768 ? "55px" : "70px",
                height: window.innerWidth < 768 ? "35px" : "45px",
                fontSize: window.innerWidth < 768 ? "0.75rem" : "1rem",
                borderRadius: "50%",
                background: "#0b8",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                color: "#fff",
                fontWeight: "bold" }}>
            Exit game
          </button>
          <h1  style={{
                position: "fixed",
                top: "0%",
                right: "25%",
                zIndex: 1000,
                fontSize: window.innerWidth < 768 ? "1rem" : "2rem",
                width: "50%", // más ancho en móvil
                textAlign: "center",
                height: "10%",
                color: "#ff000081",
      
                fontWeight: "bold" }}>press R to restart</h1>
        </div>
      )}

{/* Canvas de React Three Fiber, que reemplaza el canvas vanilla */}
    {gameState === "playing" && (
      <Canvas id = "canvas"  camera ={{ position: [0, 0, 0], fov:60}} > {/* X(W) , Y(H) , Z(DETRAS) */}

          {/* Entorno HDR ["sunset", "dawn", "night", "warehouse", "forest", "apartment", "studio", "city", "park", "lobby"]*/}
          <Environment preset="night" background={false} />
          {/*Iluminacion de la escena*/}
          <ambientLight intensity={0.5} />
          <directionalLight position={[-25, 10, 100]} />
      {/*     <Stats/> */}

          {/** controladores de depuracion de camara, desactivados por defecto **/}
          {/* <CameraDebugger/> */} {/* esto para ver la posicion de camara en consola*/} 
          
          {/* Cámara que usa el ref del coche para seguirlo */}
          <Camera
            targetRef={carRef}
            followCamera={following}
            offset={[0, 4, -12]}         // cámara atrás y arriba
            lookAtOffset={[0, 1.2, 0]}    // hacia dónde mira relativo al target
            positionLerp={0.12}
            rotationLerp={0.16}
          />
          <PerspectiveCamera makeDefault fov={90} zoom={2}></PerspectiveCamera>
                

          {/*modelos con fisicas*/}

          <Physics broadphase="SAP" gravity={[0, -4, 0]}>
           {/*  <Debug color="lime"> {/* Muestra las coliciones(tamaño de "boxes") */}
            
              {/*mapa*/}
              <Suspense>
                <ModelMap/>
                <Ground></Ground>
              </Suspense>

              {/*modelo sol*/}
              <ModelSun/>
              {/*modelo rampa*/}
              <Ramp/>
              {/*modelo texto*/}
              <Text3D />
              {/*modelo del coche //character principal, lo sigue la camara*/}
              <ModelCar ref={carRef}/>
              {/*modelos pudus*/}
              <ModelPudu position={[1, 1, -10]} rotation={[0, 0, 0]}></ModelPudu>


           {/*  </Debug> {/* esto es un comentario*/}
          </Physics>
          
        </Canvas>
        )}

        </div>
    </div>
    </>
  );
}


