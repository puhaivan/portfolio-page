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

  // Apply texture & enable shadows
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // ✅ cat casts shadow
        child.receiveShadow = true; // ✅ cat can receive subtle shadows
        if (child.name === '0000_pet_s_4cat_Black_1') {
          child.material = new THREE.MeshStandardMaterial({ map: bodyTexture });
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, bodyTexture]);

  // Play meav sound
  const playMeav = () => {
    const audio = new Audio('/sounds/meav.mp3');
    audio.onerror = () => {
      audio.src = '/sounds/meav.ogg';
      audio.play().catch(() => {});
    };
    audio.play().catch(() => {});
  };

  // Hover effect
  const handlePointerOver = () => {
    if (group.current) group.current.scale.set(0.11, 0.09, 0.09);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    if (group.current) group.current.scale.set(0.1, 0.08, 0.08);
    document.body.style.cursor = 'default';
  };

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 6, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      {/* Shadow ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} /> {/* ✅ softer shadow instead of grey floor */}
      </mesh>

      {/* Cat model */}
      <group
        ref={group}
        dispose={null}
        scale={[0.1, 0.08, 0.08]}
        position={[0, -2, 0]} // ✅ centered cat
        onClick={playMeav}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={scene} />
      </group>

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

useGLTF.preload('/models/cat/cat-walk.glb');
useTexture.preload('/models/cat/textures/gltf_embedded_0.jpeg');
