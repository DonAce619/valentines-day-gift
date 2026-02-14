import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#040927') },
    uColor2: { value: new THREE.Color('#c22938') },
    uColor3: { value: new THREE.Color('#e16f23') },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime * 0.4;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float wave = sin(pos.x * 2.0 + uTime) * 0.2;
      wave += sin(pos.y * 1.5 + uTime * 0.8) * 0.15;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      float noise = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
      noise *= sin(vUv.y * 8.0 + uTime * 0.7) * 0.5 + 0.5;
      
      vec3 color = mix(uColor1, uColor2, vUv.x + noise * 0.3);
      color = mix(color, uColor3, vUv.y * 0.5 + sin(uTime) * 0.1);
      
      float glow = sin(vUv.x * 5.0 + uTime) * 0.1;
      color += glow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2 + 0.1, 0, 0.4]} position={[0, -1, 0]}>
      <planeGeometry args={[15, 15, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
