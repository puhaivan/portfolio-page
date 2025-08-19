import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function CatModel() {
  const group = useRef();
  const { scene } = useGLTF('/models/cat/cat-walk.glb');

  const bodyTexture = useTexture('/models/cat/textures/gltf_embedded_0.jpeg');

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.name === '0000_pet_s_4cat_Black_1') {
          child.material = new THREE.MeshStandardMaterial({ map: bodyTexture });
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, bodyTexture]);

  const playMeav = () => {
    const audio = new Audio('/sounds/meav.mp3');
    audio.onerror = () => {
      audio.src = '/sounds/meav.ogg';
      audio.play().catch(() => {});
    };
    audio.play().catch(() => {});
  };

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

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

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
