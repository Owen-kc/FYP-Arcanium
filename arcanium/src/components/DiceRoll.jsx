// TEST FILE

import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import * as THREE from 'three';
import { DiceManager, DiceD6 } from 'threejs-dice';
import * as CANNON from 'cannon';

function DiceRoll({ onRollEnd }) {
  const diceContainerRef = useRef();
  const [diceWorld] = useState(new CANNON.World());

  useEffect(() => {
    // Three.js scene setup
    const width = diceContainerRef.current.clientWidth;
    const height = diceContainerRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Setup the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    diceContainerRef.current.appendChild(renderer.domElement);

    // Setup the CANNON.js world
    diceWorld.gravity.set(0, -9.82 * 20, 0);
    DiceManager.setWorld(diceWorld);

    // Create the dice
    const dice = new DiceD6({ size: 1.5, backColor: '#ff0000' });
    scene.add(dice.getObject());

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x707070);
    scene.add(ambientLight);

    // Listen for dice roll completion
    const onDiceComplete = (event) => {
      if (event.detail.dice === dice) {
        onRollEnd(dice.getUpsideValue());
      }
    };
    window.addEventListener('diceComplete', onDiceComplete);

    // Handle the animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (diceWorld) {
        diceWorld.step(1.0 / 60.0);
      }
      dice.updateMeshFromBody();
      renderer.render(scene, camera);
    };
    animate();

    // Start the dice roll
    const values = DiceManager.prepareValues([{ dice: dice, value: Math.floor(Math.random() * 6) + 1 }]);
    DiceManager.throwDice(values);

    // Clean-up function
    return () => {
      window.removeEventListener('diceComplete', onDiceComplete);
      diceContainerRef.current.removeChild(renderer.domElement);
      scene.remove(dice.getObject());
    };
  }, [onRollEnd, diceWorld]);

  return <Box ref={diceContainerRef} sx={{ width: '100%', height: '400px', overflow: 'hidden' }} />;
}

export default DiceRoll;
