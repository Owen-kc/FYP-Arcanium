import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Model = ({ path }) => {
  const gltf = useLoader(GLTFLoader, path);
  const mixer = useRef(new THREE.AnimationMixer(null)); 
  const modelRef = useRef(); 

  // Animation handling
  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
      });
    }

    // Traversing the model to enable shadows for all meshes
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Meshes will cast shadows
        child.receiveShadow = true; // Meshes will receive shadows
      }
    });

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current.uncacheRoot(gltf.scene);
      }
    };
  }, [gltf]);

  // Update the mixer on each frame
  useFrame((_, delta) => mixer.current?.update(delta));

  return <primitive ref={modelRef} object={gltf.scene} scale={1} />;
};

export default Model;
