//SCENE
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Stats, Environment, PerspectiveCamera } from '@react-three/drei';

import { useState, useRef, Suspense } from 'react';
import Camera from './character/Camera';
import MusicPlayer from './utilitycomponents/MusicPlayer';

import ModelMap from './components/Map';
import Ground from './components/Ground';
import ModelCar from './character/Car';
import ModelPudu from './components/Pudu';
import ModelSun from './components/Sun';
import Text3D from './components/TextSection';
import Ramp from './components/Ramp';

export default function CanvasFiber() {
  const carRef = useRef();
  const [following, setFollowing] = useState(true);

  // 👇 Estados: "start", "playing", "end"
  const [gameState, setGameState] = useState("start");

  return (
    <div id="bodydiv">
      <div id="marco">
        {/* reproductor de musica */}
        <MusicPlayer />

        {/* Botón de cámara solo si estamos jugando */}
        {gameState === "playing" && (
          <button
            onClick={() => setFollowing((f) => !f)}
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              zIndex: 1000,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: following ? "#0b8" : "#ff0000ff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            }}
          >
            {following ? "ON" : "OFF"}
          </button>
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
                    className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-700 transition">
              Exit game
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <Canvas id="canvas" camera={{ position: [0, 0, 0], fov: 60 }}>

            <Environment preset="night" background={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[-25, 10, 100]} />
            <Stats />

            <Camera
              targetRef={carRef}
              followCamera={following}
              offset={[0, 4, -12]}
              lookAtOffset={[0, 1.2, 0]}
              positionLerp={0.12}
              rotationLerp={0.16}
            />
            <PerspectiveCamera makeDefault fov={90} zoom={2} />

            <Physics broadphase="SAP" gravity={[0, -4, 0]}>
              <Suspense>
                <ModelMap />
                <Ground />
              </Suspense>

              <ModelSun />
              <Ramp />
              <Text3D />
              <ModelCar ref={carRef} />
              <ModelPudu position={[1, 1, -10]} rotation={[0, 0, 0]} />
            </Physics>
          </Canvas>
        )}

      </div>
    </div>
  );
}
