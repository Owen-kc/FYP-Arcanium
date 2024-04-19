import React, { useRef, useLayoutEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";

const color = "#301934";

const Icosahedron = () => (
    <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    {/* Updated material with more properties */}
    <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
  </mesh>
  );
  

const Star = ({ p }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

const Scene = ({ numStars = 1000 }) => {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005
    );
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio || 2);
  });

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />);
  }

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={0.5} /> 
      <directionalLight position={[0, 0, 5]} intensity={1} /> 
      <Icosahedron />
      {stars}
    </>
  );
};

const DiceAnimation = () => {
  return (
    <div className="container">
      <Canvas
  shadows
  style={{ width: '100%', height: '500px', background: 'transparent' }}
  gl={{ antialias: true }}
>
  <Scene />
</Canvas>

    </div>
  );
};

export default DiceAnimation;
