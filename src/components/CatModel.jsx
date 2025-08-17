import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function CatModel() {
  const group = useRef();
  const { scene } = useGLTF('/models/cat/cat-walk.glb');

  // Load textures
  const bodyTexture = useTexture('/models/cat/textures/gltf_embedded_0.jpeg');

  // Auto-rotation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  // Apply texture to mesh
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name === '0000_pet_s_4cat_Black_1') {
        child.material = new THREE.MeshStandardMaterial({ map: bodyTexture });
        child.material.needsUpdate = true;
      }
    });
  }, [scene, bodyTexture]);

  // Play meav sound
  const playMeav = () => {
    const audio = new Audio();
    audio.src = '/sounds/meav.mp3'; // fallback logic
    audio.onerror = () => {
      audio.src = '/sounds/meav.ogg'; // fallback to ogg
      audio.play().catch(() => {});
    };
    audio.play().catch(() => {});
  };

  // Hover effect
  const handlePointerOver = () => {
    if (group.current) group.current.scale.set(0.11, 0.09, 0.09); // slightly bigger
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    if (group.current) group.current.scale.set(0.1, 0.08, 0.08); // reset size
    document.body.style.cursor = 'default';
  };

  return (
    <>
      <group
        ref={group}
        dispose={null}
        scale={[0.1, 0.08, 0.08]}
        position={[0, -2, 0]}
        onClick={playMeav}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={scene} />
      </group>
      <OrbitControls enablePan={false} enableZoom={false} />
    </>
  );
}

useGLTF.preload('/models/cat/cat-walk.glb');
useTexture.preload('/models/cat/textures/gltf_embedded_0.jpeg');
