import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function Camera({ targetRef, followCamera, offset = [0, 0, 0], lookAtOffset = [0, 0, 0], positionLerp = 0.1, rotationLerp = 0.1 }) {

  const camera = useThree((state) => state.camera);
  const orbitRef = useRef();
  
  const fixedY = useRef(null);

  const desiredPosition = useRef(new THREE.Vector3());
  const desiredLookAt = useRef(new THREE.Vector3());
  const tmpVector = useRef(new THREE.Vector3());
  const tmpQuaternion = useRef(new THREE.Quaternion());

  useEffect(() => {
    if (targetRef?.current && fixedY.current === null) {
      const worldPos = new THREE.Vector3();
      targetRef.current.getWorldPosition(worldPos);
      fixedY.current = worldPos.y + offset[1];
    }
  }, [targetRef, offset]);

  useFrame(() => {
    if (followCamera && targetRef?.current) {
      targetRef.current.getWorldPosition(tmpVector.current);
      targetRef.current.getWorldQuaternion(tmpQuaternion.current);

      const horizontalOffset = new THREE.Vector3(offset[0], 0, offset[2]);
      horizontalOffset.applyQuaternion(tmpQuaternion.current);

      // 🔹 Altura dinámica: suaviza la Y hacia la posición actual del target
      if (fixedY.current === null) fixedY.current = tmpVector.current.y + offset[1];
      fixedY.current = THREE.MathUtils.lerp(fixedY.current, tmpVector.current.y + offset[1], 0.05);

      desiredPosition.current.set(
        tmpVector.current.x + horizontalOffset.x,
        fixedY.current,
        tmpVector.current.z + horizontalOffset.z
      );

      desiredLookAt.current.set(...lookAtOffset)
        .applyQuaternion(tmpQuaternion.current)
        .add(tmpVector.current);

      camera.position.lerp(desiredPosition.current, positionLerp);

      const m = new THREE.Matrix4().lookAt(camera.position, desiredLookAt.current, camera.up);
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(m);
      camera.quaternion.slerp(targetQuat, rotationLerp);
    }
  });

  useEffect(() => {
    if (orbitRef.current) orbitRef.current.enabled = !followCamera;
  }, [followCamera]);

  return !followCamera ? <OrbitControls ref={orbitRef} /> : null;
}
