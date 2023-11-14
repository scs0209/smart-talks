import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Text3D,
  OrbitControls,
  shaderMaterial,
  Center,
} from '@react-three/drei'
import THREE, { Color } from 'three'

const GradientShaderMaterial = shaderMaterial(
  { color1: new Color('#6190ED'), color2: new Color('#A7BFE8') },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
)

const TextComponent = () => {
  const gradientShaderMaterial = useMemo(() => new GradientShaderMaterial(), [])
  const textRef = useRef<any>()

  useFrame(() => {
    if (textRef.current) {
      textRef.current.material = gradientShaderMaterial
      textRef.current.material.needsUpdate = true
    }
  })

  return (
    <Center rotation={[-0.2, -0.25, 0]}>
      <Text3D
        ref={textRef}
        font="/Inter_Bold.json"
        curveSegments={32}
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
        material={gradientShaderMaterial}
      >
        FILM FINDER
        <meshBasicMaterial />
      </Text3D>
    </Center>
  )
}

const Movix = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} />
      <TextComponent />
      <OrbitControls />
    </Canvas>
  )
}

export default Movix
