import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({});
  const [canJump, setCanJump] = useState(true);

  useEffect(() => {
    const keyDownHandler = (e) => {
      const key = e.key.toLowerCase();
      

      // Movimiento normal
      setControls((controls) => ({ ...controls, [key]: true }));

      // Salto solo con la tecla espacio
      if (key === " " && canJump && !e.repeat) {
        chassisApi.applyImpulse([0, 500, 0], [0, 0, 0]); // Salto fuerte
        setCanJump(false);
      }
    };

    const keyUpHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [canJump, chassisApi]);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    const maxForce = 200; // fuerza hacia adelante
    const steerValue = 0.5;        // giro más sensible

    // Movimiento hacia adelante/atrás
    if (controls.w) {
      vehicleApi.applyEngineForce(-maxForce, 2);
      vehicleApi.applyEngineForce(-maxForce, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(maxForce, 2);
      vehicleApi.applyEngineForce(maxForce, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    // Giro
    if (controls.a) {
      vehicleApi.setSteeringValue(steerValue, 0);
      vehicleApi.setSteeringValue(steerValue, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-steerValue, 0);
      vehicleApi.setSteeringValue(-steerValue, 1);
    } else {
      for (let i = 0; i < 4; i++) vehicleApi.setSteeringValue(0, i);
    }

    // Reset
    if (controls.r) {
      chassisApi.position.set(-40,96,147); //modificar posicion (misma que el auto)
      chassisApi.rotation.set(0, Math.PI + 5, 0);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      setCanJump(true);
    }

    // Detectar si tocó el suelo
    chassisApi.velocity.subscribe((vel) => {
      if (Math.abs(vel[1]) < 0.1) setCanJump(true);
    });
  }, [controls, vehicleApi, chassisApi]);

};
