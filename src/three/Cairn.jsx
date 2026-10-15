import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── tiny value-noise so the pebbles aren't perfect spheres ──
function hash(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
  return s - Math.floor(s)
}
function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = x - xi, yf = y - yi, zf = z - zi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf)
  const l = (a, b, t) => a + (b - a) * t
  const c = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz)
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v),
    w
  )
}

function pebbleGeometry(seed, sx, sy, sz) {
  const g = new THREE.IcosahedronGeometry(1, 48)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    const n = noise3(v.x * 1.6 + seed, v.y * 1.6, v.z * 1.6) * 0.09 + noise3(v.x * 5 + seed, v.y * 5, v.z * 5) * 0.015
    v.multiplyScalar(1 + n)
    p.setXYZ(i, v.x * sx, v.y * sy, v.z * sz)
  }
  g.computeVertexNormals()
  return g
}

function shadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const gr = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  gr.addColorStop(0, 'rgba(16,18,15,0.55)')
  gr.addColorStop(0.5, 'rgba(16,18,15,0.18)')
  gr.addColorStop(1, 'rgba(16,18,15,0)')
  ctx.fillStyle = gr
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

const STONES = [
  { seed: 3.1, s: [1.25, 0.62, 1.05], y: -1.05, color: '#4f564a', rough: 0.92 },
  { seed: 8.4, s: [0.9, 0.48, 0.78], y: -0.02, color: '#646b5e', rough: 0.88 },
  { seed: 1.7, s: [0.58, 0.36, 0.52], y: 0.78, color: '#7a8273', rough: 0.85 },
]

function Stack({ progress, pointer }) {
  const group = useRef()
  const parts = useRef([])
  const geos = useMemo(() => STONES.map((s) => pebbleGeometry(s.seed, ...s.s)), [])
  const shadow = useMemo(shadowTexture, [])
  const { size } = useThree()
  const portrait = size.width / size.height < 0.9
  const baseScale = portrait ? 0.55 : 0.82
  const baseX = portrait ? 0.15 : 0.95

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = progress.current
    const g = group.current
    // mouse parallax (eased)
    g.rotation.y += ((pointer.current.x * 0.35 + t * 0.06) - g.rotation.y) * 0.04
    g.rotation.x += ((pointer.current.y * 0.12) - g.rotation.x) * 0.04
    // scroll: sink + shrink + drift right
    const target = baseScale - p * 0.3
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target, 0.1))
    g.position.y = THREE.MathUtils.lerp(g.position.y, (portrait ? -0.45 : -0.05) - p * 1.3, 0.1)
    g.position.x = THREE.MathUtils.lerp(g.position.x, baseX, 0.1)
    // each stone sways a little, top one the most
    parts.current.forEach((m, i) => {
      if (!m) return
      m.rotation.z = Math.sin(t * 0.6 + i) * 0.02 * (i + 1)
      m.position.x = Math.sin(t * 0.5 + i * 1.3) * 0.015 * i
    })
  })

  return (
    <group ref={group} position={[0.95, -0.05, 0]} scale={0.82}>
      {STONES.map((s, i) => (
        <mesh key={i} ref={(el) => (parts.current[i] = el)} geometry={geos[i]} position={[0, s.y, 0]} castShadow>
          <meshStandardMaterial color={s.color} roughness={s.rough} metalness={0.02} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.66, 0]}>
        <planeGeometry args={[4.2, 4.2]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function Cairn({ progress, pointer }) {
  return (
    <Canvas
      className="cairn"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.25, 6.8], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.55} color="#dfe6d8" />
      <directionalLight position={[-4, 5, 3]} intensity={2.1} color="#f4f7ee" />
      <directionalLight position={[5, 1, -2]} intensity={0.7} color="#9fb096" />
      <hemisphereLight args={['#c2cabb', '#1a1c18', 0.4]} />
      <Stack progress={progress} pointer={pointer} />
    </Canvas>
  )
}
