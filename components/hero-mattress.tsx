'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';

function MattressModel({ active }: { active: boolean }) {
  const group = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.025;
  });

  return (
    <group ref={group} rotation={[-0.18, 0.35, -0.08]} position={[0, -0.15, 0]}>
      <RoundedBox args={[4.9, 0.34, 2.45]} radius={0.18} smoothness={5} position={[0, 0.92, 0]}>
        <meshPhysicalMaterial color="#edf6f2" roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[4.8, 0.38, 2.35]} radius={0.16} smoothness={5} position={[0, 0.58, 0]}>
        <meshPhysicalMaterial color="#8bd8cc" roughness={0.42} metalness={0.03} />
      </RoundedBox>
      <RoundedBox args={[4.72, 0.42, 2.28]} radius={0.14} smoothness={5} position={[0, 0.19, 0]}>
        <meshPhysicalMaterial color="#2d766c" roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[4.62, 0.52, 2.2]} radius={0.12} smoothness={5} position={[0, -0.25, 0]}>
        <meshPhysicalMaterial color="#123d38" roughness={0.52} />
      </RoundedBox>
      <mesh position={[0, -0.53, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.35, 1.95]} />
        <meshStandardMaterial color="#092e2a" roughness={0.7} />
      </mesh>
      {[[-1.55, -0.55], [-0.5, -0.55], [0.55, -0.55], [1.6, -0.55]].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, -0.55, z * 0.1]}>
          <cylinderGeometry args={[0.09, 0.09, 0.22, 16]} />
          <meshStandardMaterial color="#55d7c7" emissive="#1aa99a" emissiveIntensity={active ? 1.5 : 0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroMattress() {
  const [active, setActive] = useState(false);
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[540px]" aria-label="Interactive 3D mattress visualization" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#45dbc7]/20 blur-3xl" />
      <div className="absolute right-[6%] top-[17%] rounded-full border border-white/70 bg-white/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#28534c] shadow-sm backdrop-blur-xl">Cooling cover</div>
      <div className="absolute left-[4%] top-[48%] rounded-full border border-[#75b9af]/30 bg-[#092e2a]/85 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white shadow-lg backdrop-blur-xl">Support core</div>
      <Canvas camera={{ position: [0, 2.5, 7.2], fov: 34 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={3} />
        <pointLight position={[-4, 2, 3]} intensity={2.5} color="#65e5d4" />
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
          <MattressModel active={active} />
        </Float>
        <Environment preset="studio" />
      </Canvas>
      <div className="absolute bottom-[6%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-medium text-[#55706a] shadow-lg backdrop-blur-xl">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#18b7a2]" /> Move around to explore
      </div>
    </div>
  );
}
