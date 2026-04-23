"use client";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture, Decal } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from 'three';

const TechBall = ({ icon, position, index }: { icon: string, position: [number, number, number], index: number }) => {
  const [decal] = useTexture([icon]);

  const decalTransforms = [
    { pos: [0, 0, 1] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
    { pos: [0, 0, -1] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number] },
    { pos: [1, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number] },
    { pos: [-1, 0, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number] },
    { pos: [0, 1, 0] as [number, number, number], rot: [-Math.PI / 2, 0, 0] as [number, number, number] },
    { pos: [0, -1, 0] as [number, number, number], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
  ];

  return (
    <RigidBody colliders="ball" position={position} rotation={[-Math.PI / 2, 0, 0]} restitution={0.9} linearDamping={0.5} angularDamping={0.5} mass={1}>
      <mesh castShadow receiveShadow scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {decalTransforms.map((transform, i) => (
          <Decal
            key={i}
            position={transform.pos}
            rotation={transform.rot}
            scale={1}
            map={decal}
          />
        ))}
      </mesh>
    </RigidBody>
  );
};

const Borders = () => {
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -0.5, 0]} restitution={0.5} friction={0.5}>
        <CuboidCollider args={[20, 0.5, 20]} />
      </RigidBody>
      {/* Walls */}
      <RigidBody type="fixed" position={[0, 1, -10]} restitution={0.8}>
        <CuboidCollider args={[20, 2, 1]} />
        <mesh>
             <boxGeometry args={[40, 4, 2]} />
             <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[0, 1, 10]} restitution={0.8}>
        <CuboidCollider args={[20, 2, 1]} />
        <mesh>
             <boxGeometry args={[40, 4, 2]} />
             <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[-15, 1, 0]} restitution={0.8}>
        <CuboidCollider args={[1, 2, 20]} />
        <mesh>
             <boxGeometry args={[2, 4, 40]} />
             <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[15, 1, 0]} restitution={0.8}>
        <CuboidCollider args={[1, 2, 20]} />
        <mesh>
             <boxGeometry args={[2, 4, 40]} />
             <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </RigidBody>
      {/* Invisible ceiling to prevent balls from flying off the table */}
      <RigidBody type="fixed" position={[0, 4, 0]} restitution={0.5} friction={0.5}>
        <CuboidCollider args={[20, 0.5, 20]} />
      </RigidBody>
    </>
  )
}

const PointerPoleLogic = ({poleRef, target}: {poleRef: any, target: React.MutableRefObject<THREE.Vector3>}) => {
    useFrame(() => {
        if (!poleRef.current) return;
        const current = poleRef.current.translation();
        const next = new THREE.Vector3(current.x, current.y, current.z).lerp(target.current, 0.3);
        poleRef.current.setNextKinematicTranslation(next);
    });
    return null;
}

const CursorPole = () => {
    const poleRef = useRef<any>(null);
    const target = useRef(new THREE.Vector3(12, 1, 0));
    const [dragging, setDragging] = useState(false);
    
    return (
      <>
        {/* Invisible catch plane for dragging the cue pole */}
        <mesh 
           visible={false} 
           rotation={[-Math.PI / 2, 0, 0]}
           position={[0, 1, 0]}
           onPointerDown={(e) => {
               setDragging(true);
               target.current.copy(e.point);
           }}
           onPointerUp={() => setDragging(false)}
           onPointerLeave={() => setDragging(false)}
           onPointerMove={(e) => {
               if (dragging) {
                   target.current.copy(e.point);
               }
           }}
        >
            <planeGeometry args={[100, 100]} />
        </mesh>
        
        <PointerPoleLogic poleRef={poleRef} target={target} />

        <RigidBody ref={poleRef} type="kinematicPosition" position={[12, 1, 0]} restitution={1}>
             <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                 <cylinderGeometry args={[0.3, 0.5, 14, 32]} />
                 <meshStandardMaterial color="#8b5a2b" roughness={0.4} />
             </mesh>
             {/* The tip of the cue */}
             <mesh position={[-7, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                 <cylinderGeometry args={[0.3, 0.31, 0.5, 16]} />
                 <meshStandardMaterial color="#ffffff" />
             </mesh>
             <mesh position={[-7.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                 <cylinderGeometry args={[0.25, 0.3, 0.2, 16]} />
                 <meshStandardMaterial color="#4444ff" />
             </mesh>
        </RigidBody>
      </>
    )
}

const PoolScene = ({ technologies }: { technologies: any[] }) => {
  // Place nodes in a rough triangle pool formation (9 balls)
  const positions: [number, number, number][] = [
    [-2, 1, 0],          // 1st row
    [-4, 1, -1.5], [-4, 1, 1.5], // 2nd row
    [-6, 1, -3], [-6, 1, 0], [-6, 1, 3], // 3rd row
    [-8, 1, -1.5], [-8, 1, 1.5], // 4th row
    [-10, 1, 0]          // 5th row
  ];

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [0, 25, 0], fov: 50 }}
      style={{ width: "100%", height: "100%", cursor: "crosshair", borderRadius: "1.5rem" }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 5]} intensity={2.0} castShadow />
        <directionalLight position={[5, 10, -5]} intensity={1.0} />
        
        <Physics gravity={[0, -30, 0]}>
          <Borders />
          {technologies.map((tech, index) => (
            <TechBall key={tech.name} icon={tech.icon} position={positions[index] || [0, 1, 0]} index={index} />
          ))}
          <CursorPole />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default PoolScene;
