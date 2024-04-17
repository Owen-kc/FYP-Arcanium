import React, { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, GridHelper, AxesHelper } from '@react-three/drei'; // For camera controls
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const ModelViewer = ({ modelPath }) => {
  const CameraHelper = () => {
    const { camera } = useThree();
    camera.position.set(90, 20, 150); // y to be higher
    camera.lookAt(0, 0, 0); 
    camera.updateProjectionMatrix();
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}> 
      <Canvas shadows camera={{ position: [0, 100, 50], fov: 50 }}>
        <CameraHelper />
        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />
        
        <ambientLight intensity={1.3} />

        <spotLight
          position={[50, 100, 50]} // Adjust to illuminate more of the scene
          angle={0.3}
          intensity={0.4}
          color={0xffa040}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={500}
          shadow-camera-near={0.5}
        />

        <hemisphereLight
          skyColor={0xddeeff} // Light blue sky color
          groundColor={0x080820}
          intensity={0.8} 
          position={[0, 200, 0]} // Elevated position
        />

        <directionalLight 
          position={[0, 80, 100]}
          intensity={3.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-150}
          shadow-camera-right={150}
          shadow-camera-top={150}
          shadow-camera-bottom={-150}
        />

        <Suspense fallback={null}>
          <Model path={modelPath} />
        </Suspense>
        <EffectComposer>
        <Bloom
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} // Smoother bloom
            intensity={0.2} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
