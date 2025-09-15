import { useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";

export const useWheels = (width, height, front, radius) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [-1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -40,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.5, -height * 0.5, front + 0.2], //DD
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.5, -height * 0.5, front+ 0.2], //DI
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.5, -height * 0.5, -front - 0.1], //TD
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.5, -height * 0.5, -front -0.1], //TI
      isFrontWheel: false,
    },
  ];

  const propsFunc = (isFrontWheel) => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [radius, radius, 0.2, 16],
        rotation: [0, 0, -Math.PI /2],
        type: "Cylinder",
      },
    ],
    type: isFrontWheel ? "Kinematic" : "Dynamic", // delanteras kinematic, traseras dinámicas
  });

  useCompoundBody(() => propsFunc(true), wheels[0]);  // DI (delantera)
  useCompoundBody(() => propsFunc(true), wheels[1]);  // DD (delantera)
  useCompoundBody(() => propsFunc(false), wheels[2]); // TI (trasera)
  useCompoundBody(() => propsFunc(false), wheels[3]); // TD (trasera)

  return [wheels, wheelInfos];
};