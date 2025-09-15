import { useBox } from "@react-three/cannon";

export default function GroundBox({ size = [500, 1, 500], position = [0, -0.5, 0] }) {
  const [ref] = useBox(() => ({
    type: "Static",
    args: size,      // dimensiones para la física
    position,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={size} /> {/* dimensiones exactas del cuerpo de física */}
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
