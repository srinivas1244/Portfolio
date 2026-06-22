"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/** Subtle camera parallax that follows the pointer. */
function Rig() {
  useFrame((state) => {
    const px = state.pointer.x * 0.6;
    const py = state.pointer.y * 0.4;
    state.camera.position.x += (px - state.camera.position.x) * 0.05;
    state.camera.position.y += (py - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * A living neural network — glowing nodes connected by edges, like an AI graph.
 * Generated once: random nodes in an ellipsoid, edges drawn between nearby pairs.
 */
function NeuralNetwork() {
  const group = useRef<THREE.Group>(null);
  const hub = useRef<THREE.Mesh>(null);

  const { nodePositions, nodeColors, linePositions } = useMemo(() => {
    const COUNT = 72;
    const nodes: THREE.Vector3[] = [];
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const colorA = new THREE.Color("#7c5cff");
    const colorB = new THREE.Color("#22d3ee");

    for (let i = 0; i < COUNT; i++) {
      const r = Math.cbrt(Math.random()) * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.35;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = r * Math.cos(phi) * 0.7;
      nodes.push(new THREE.Vector3(x, y, z));
      positions.set([x, y, z], i * 3);
      const c = colorA.clone().lerp(colorB, Math.random());
      colors.set([c.r, c.g, c.b], i * 3);
    }

    const lines: number[] = [];
    const THRESHOLD = 1.55;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < THRESHOLD) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    return {
      nodePositions: positions,
      nodeColors: colors,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame((state, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.06;
    if (hub.current) {
      // gentle pulse on the core node
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 1.6) * 0.12;
      hub.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6d6df5"
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* glowing core node */}
      <mesh ref={hub}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#7c5cff" emissiveIntensity={2.2} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={60} color="#7c5cff" decay={2} />
        <pointLight position={[-5, -3, 2]} intensity={40} color="#22d3ee" decay={2} />
        <NeuralNetwork />
        <Sparkles count={120} scale={[14, 9, 6]} size={1.6} speed={0.2} color="#a99cff" opacity={0.5} />
        <Rig />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
