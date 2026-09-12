"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Ribbon({
  points,
  radius = 0.12,
}: {
  points: THREE.Vector3[];
  radius?: number;
}) {
  const curve = new THREE.CatmullRomCurve3(points);

  return (
    <mesh>
      <tubeGeometry
        args={[
          curve,
          80,
          radius,
          16,
          false,
        ]}
      />

      <meshPhysicalMaterial
        metalness={0.9}
        roughness={0.16}
        clearcoat={1}
        clearcoatRoughness={0.08}
      />
    </mesh>
  );
}

function VTObject() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const targetX = state.pointer.y * 0.16;
    const targetY = state.pointer.x * 0.24;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.025
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.025
    );
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.06}
      floatIntensity={0.25}
    >
      <group ref={group} scale={1.15}>

        {/* Main sculptural V */}
        <Ribbon
          radius={0.16}
          points={[
            new THREE.Vector3(-1.35, 1.15, 0),
            new THREE.Vector3(-0.85, 0.15, 0.08),
            new THREE.Vector3(-0.35, -0.95, 0),
            new THREE.Vector3(0, -0.05, 0.08),
          ]}
        />

        <Ribbon
          radius={0.16}
          points={[
            new THREE.Vector3(1.35, 1.15, 0),
            new THREE.Vector3(0.85, 0.15, 0.08),
            new THREE.Vector3(0.35, -0.95, 0),
            new THREE.Vector3(0, -0.05, 0.08),
          ]}
        />

        {/* T-inspired upper sweep */}
        <Ribbon
          radius={0.13}
          points={[
            new THREE.Vector3(-1.15, 1.15, 0.02),
            new THREE.Vector3(0, 1.35, 0.12),
            new THREE.Vector3(1.15, 1.15, 0.02),
          ]}
        />

        {/* Central sculptural core */}
        <mesh position={[0, -0.02, 0.02]}>
          <sphereGeometry args={[0.28, 48, 48]} />

          <meshPhysicalMaterial
            metalness={1}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

      </group>
    </Float>
  );
}

export default function VTScene() {
  return (
    <div className="h-[360px] w-full md:h-[500px]">
      <Canvas
        camera={{
          position: [0, 0, 5.8],
          fov: 38,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.35} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={4}
        />

        <directionalLight
          position={[-4, 2, 4]}
          intensity={2}
        />

        <pointLight
          position={[0, 0, 3]}
          intensity={1.5}
        />

        <Environment preset="studio" />

        <VTObject />
      </Canvas>
    </div>
  );
}