import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1800;

function FireParticles({ mouseRef }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  const posArr = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const velArr = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const lifeArr = useMemo(() => new Float32Array(PARTICLE_COUNT), []);
  const colorArr = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const sizeArr = useMemo(() => new Float32Array(PARTICLE_COUNT), []);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // We safely use the viewport properties inside effect without loop-dependency mapping
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      reinitParticle(i, true);
    }
    setInitialized(true);
  }, [viewport.width]); // Re-map if viewport changes

  function reinitParticle(i, initialSpread = false) {
    // Edge-to-Edge WebGL Fire Emitter Spread
    // Computes absolute total screen distribution scaled relative to aspect ratio
    const spawnWidth = viewport.width * 1.5;

    posArr[i * 3] = (Math.random() - 0.5) * spawnWidth;
    posArr[i * 3 + 1] = initialSpread ? (Math.random() - 0.5) * 12 : -7;
    posArr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    
    // Slight outward drift logic for X-axis
    // Particles further left drift left, further right drift right
    const normalizedX = posArr[i * 3] / (spawnWidth / 2); // -1 to 1
    const outwardDrift = normalizedX * 0.005;
    
    velArr[i * 3] = ((Math.random() - 0.5) * 0.015) + outwardDrift;
    velArr[i * 3 + 1] = 0.02 + Math.random() * 0.04;
    velArr[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    
    lifeArr[i] = Math.random();
    sizeArr[i] = 0.015 + Math.random() * 0.04;
    setColor(i, lifeArr[i]);
  }

  function setColor(i, life) {
    if (life > 0.8) {
      colorArr[i * 3] = 1.0;
      colorArr[i * 3 + 1] = 0.9;
      colorArr[i * 3 + 2] = 0.6;
    } else if (life > 0.5) {
      colorArr[i * 3] = 1.0;
      colorArr[i * 3 + 1] = 0.3;
      colorArr[i * 3 + 2] = 0.05;
    } else if (life > 0.2) {
      colorArr[i * 3] = 0.8;
      colorArr[i * 3 + 1] = 0.08;
      colorArr[i * 3 + 2] = 0.01;
    } else {
      colorArr[i * 3] = 0.3;
      colorArr[i * 3 + 1] = 0.01;
      colorArr[i * 3 + 2] = 0.0;
    }
  }

  useFrame((state, delta) => {
    if (!meshRef.current || !initialized) return;

    const mouse = mouseRef.current;
    const mvx = mouse.vx || 0;
    const mvy = mouse.vy || 0;
    const mx = mouse.x || 0;
    const my = mouse.y || 0;
    const mouseInfluenceRadius = 1.5;
    const mouseForce = 0.4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifeArr[i] -= delta * (0.3 + Math.random() * 0.1);

      if (lifeArr[i] <= 0) {
        reinitParticle(i, false);
        continue;
      }

      const dx = mx - posArr[i * 3];
      const dy = my - posArr[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseInfluenceRadius && dist > 0.01) {
        const force = (1 - dist / mouseInfluenceRadius) * mouseForce * delta;
        velArr[i * 3] += mvx * force * 0.3;
        velArr[i * 3 + 1] += mvy * force * 0.1;
      }

      velArr[i * 3] += (Math.random() - 0.5) * 0.003;
      
      // Additional edge drifting over time
      velArr[i * 3] *= 1.001;

      posArr[i * 3] += velArr[i * 3];
      posArr[i * 3 + 1] += velArr[i * 3 + 1];
      posArr[i * 3 + 2] += velArr[i * 3 + 2];

      setColor(i, lifeArr[i]);
    }

    const geo = meshRef.current.geometry;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  });

  if (!initialized) return null;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posArr, 3]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-color" args={[colorArr, 3]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-size" args={[sizeArr, 1]} count={PARTICLE_COUNT} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DataNetworkWireframe({ mouseRef }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Auto-rotate gently
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    
    // Dynamic distortion target based on mouse coords
    const mx = mouseRef.current.x * 0.05;
    const my = mouseRef.current.y * 0.05;
    
    // Smooth lerp rotation towards mouse
    meshRef.current.rotation.x += (my - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (mx - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={3.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial 
        color="#FF2A2A" 
        wireframe={true} 
        transparent={true} 
        opacity={0.06}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function FireSparksCanvas() {
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      const nx = (e.clientX / window.innerWidth) * 20 - 10;
      const ny = -((e.clientY / window.innerHeight) * 14 - 7);
      mouseRef.current.vx = nx - lastPos.current.x;
      mouseRef.current.vy = ny - lastPos.current.y;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
      lastPos.current = { x: nx, y: ny };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div id="fire-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <FireParticles mouseRef={mouseRef} />
        <DataNetworkWireframe mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
