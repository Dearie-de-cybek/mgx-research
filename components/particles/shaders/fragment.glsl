// ── Particle fragment shader ───────────────────────────────────────────
// Paints each point as a soft, glowing dot: a bright core that falls off
// smoothly to transparent, tinted along a black→gray ramp so it reads as
// premium "ink in light" rather than a flat circle. Runs once per pixel
// per particle — kept branch-free for GPU efficiency.

precision mediump float;

uniform vec3 uColorNear; // darker tone — particles close to camera / near cursor
uniform vec3 uColorFar;  // lighter gray — particles further away, recedes into white bg
uniform float uOpacity;  // global fade-in driven from JS — 0 on mount → 1 once settled

varying float vAlpha;
varying float vGlow;

void main() {
  // gl_PointCoord is 0..1 across the point sprite; recenter to -0.5..0.5
  // so distance-from-center gives us a clean radial falloff for the glow.
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);

  // Soft circular mask: solid core, feathered edge — avoids the harsh
  // "square dot" look of an unmasked gl_PointCoord quad.
  float core = smoothstep(0.5, 0.0, dist);
  float halo = smoothstep(0.5, 0.18, dist) * 0.5;
  float shape = core + halo * vGlow; // cursor-influenced particles bloom slightly larger

  if (shape <= 0.001) discard;

  vec3 color = mix(uColorFar, uColorNear, clamp(vGlow * 1.6 + 0.25, 0.0, 1.0));

  float alpha = shape * vAlpha * uOpacity;
  gl_FragColor = vec4(color, alpha);
}
