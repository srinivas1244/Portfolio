"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, Sparkles, AdaptiveDpr } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { techGalaxy, type TechNode } from "@/lib/data";

type Placed = TechNode & { pos: [number, number, number] };

/** Distribute the tech nodes across three tilted orbital rings. */
function useLayout(): Placed[] {
  return useMemo(() => {
    const radii = [1.9, 2.9, 3.8];
    const yByRing = [0.5, 0, -0.5];
    const grouped: Record<number, TechNode[]> = { 0: [], 1: [], 2: [] };
    techGalaxy.forEach((n) => grouped[n.ring].push(n));

    const placed: Placed[] = [];
    ([0, 1, 2] as const).forEach((ring) => {
      const nodes = grouped[ring];
      const r = radii[ring];
      nodes.forEach((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 + ring * 0.6;
        placed.push({ ...n, pos: [Math.cos(a) * r, yByRing[ring], Math.sin(a) * r] });
      });
    });
    return placed;
  }, []);
}

function Node({ node }: { node: Placed }) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered ? 1.7 : 1;
    const cur = ref.current.scale.x;
    ref.current.scale.setScalar(cur + (target - cur) * 0.15);
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 1.6 : 0.75}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
        <div
          className="whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide backdrop-blur-md transition-colors"
          style={{
            borderColor: hovered ? node.color : "rgba(255,255,255,0.12)",
            background: hovered ? `${node.color}22` : "rgba(10,10,18,0.5)",
            color: hovered ? "#fff" : "rgba(236,236,243,0.75)",
            boxShadow: hovered ? `0 0 22px -4px ${node.color}` : "none",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function Galaxy() {
  const group = useRef<Group>(null);
  const placed = useLayout();

  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.08;
    group.current.rotation.x = 0.42 + state.pointer.y * 0.12;
    group.current.rotation.z = state.pointer.x * 0.08;
  });

  return (
    <group ref={group}>
      {/* glowing core */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#7c5cff" emissiveIntensity={1.6} roughness={0.2} />
      </mesh>
      {placed.map((n) => (
        <group key={n.label}>
          <Line points={[[0, 0, 0], n.pos]} color="#ffffff" lineWidth={1} transparent opacity={0.1} />
          <Node node={n} />
        </group>
      ))}
    </group>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={20} color="#7c5cff" decay={2} />
        <pointLight position={[6, 4, 6]} intensity={30} color="#22d3ee" decay={2} />
        <Galaxy />
        <Sparkles count={90} scale={12} size={1.6} speed={0.2} color="#9b8cff" opacity={0.4} />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
