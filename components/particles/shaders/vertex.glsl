// ── Particle vertex shader ─────────────────────────────────────────────
// Displaces each point along a procedural 3D simplex-noise flow field and
// bends its path toward the cursor with an eased radial pull + tangential
// swirl. Everything below runs per-vertex on the GPU, once per frame —
// no per-particle JS loop, which is what keeps 15k points at 60fps.

uniform float uTime;
uniform vec2  uMouse;        // cursor in the same XY space as particle base positions
uniform float uMouseRadius;  // influence radius around the cursor
uniform float uMouseStrength;// 0 → 1, eased in JS on enter/leave for a smooth handoff
uniform float uPixelRatio;
uniform float uSize;

attribute float aSeed;   // per-particle random seed — keeps motion from looking uniform
attribute float aScale;  // per-particle size variance → depth illusion

varying float vAlpha;
varying float vGlow;

// Ashima/Stefan Gustavson 3D simplex noise — classic, fast, well-distributed.
// Used here as the "invisible current" the particles flow through: sampling
// noise at (position * frequency + time) yields a smoothly-varying vector
// field with no two regions ever moving in lockstep.
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  // ── 1. Sample the flow field at this particle's resting position ──
  // Three offset noise lookups (one per axis) give a divergence-free-ish
  // vector field: each axis drifts on its own slowly-evolving current,
  // so particles glide rather than vibrate in place.
  float t = uTime * 0.06 + aSeed * 10.0;
  vec3 p = position * 0.6;

  float nx = snoise(p + vec3(0.0,   0.0, t));
  float ny = snoise(p + vec3(5.2, 1.3, t));
  float nz = snoise(p + vec3(9.1, 7.4, t));

  vec3 flow = vec3(nx, ny, nz);
  vec3 displaced = position + flow * 1.6;

  // ── 2. Cursor field: radial attraction + tangential swirl ──
  // Pulling straight toward the cursor alone reads as "snapping to a point";
  // adding a perpendicular (swirl) component makes particles arc around it,
  // like currents bending around an obstacle — far more organic.
  vec2 toMouse = uMouse - displaced.xy;
  float dist = length(toMouse);
  float influence = uMouseStrength * smoothstep(uMouseRadius, 0.0, dist);

  vec2 dir = dist > 0.0001 ? toMouse / dist : vec2(0.0);
  vec2 tangent = vec2(-dir.y, dir.x);

  displaced.xy += dir * influence * 1.4;          // pull toward cursor
  displaced.xy += tangent * influence * 1.1;      // swirl around it
  displaced.z  += influence * 0.6;                 // slight lift toward camera = depth pop

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // ── 3. Size: perspective-correct, scaled by per-particle depth + cursor proximity ──
  float sizeBoost = 1.0 + influence * 0.9;
  gl_PointSize = uSize * aScale * sizeBoost * uPixelRatio * (1.0 / -mvPosition.z);

  // Passed to fragment shader for glow + fade-with-distance shaping
  vGlow = influence;
  vAlpha = clamp(0.35 + flow.z * 0.25, 0.12, 0.75);
}
