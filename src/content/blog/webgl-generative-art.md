---
title: "Generative Art with WebGL Shaders"
description: "How I built a parametric art system using GLSL fragment shaders, Simplex noise, and domain warping — running entirely in the browser."
date: 2024-01-22
tags: ["Creative Coding", "WebGL", "GLSL", "Frontend"]
image: "/images/blog-webgl.png"
imageAlt: "Colorful generative art"
relatedProjects: ["generative-art"]
---

# Generative Art with WebGL Shaders

Fragment shaders run once per pixel, entirely on the GPU, making them perfect for generating intricate patterns at real-time frame rates. In this post I'll cover the core techniques I used in my generative art system.

## The Rendering Loop

Everything starts with a full-screen quad and a fragment shader:
```javascript
// TypeScript setup
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2")!;

// Compile shader program
function createProgram(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vert);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, frag);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  return prog;
}

// Render loop
function render(time: number) {
  gl.uniform1f(uTime, time * 0.001);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}
```

## Simplex Noise in GLSL

I ported a compact Simplex noise implementation directly into GLSL:
```glsl
#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
out vec4 fragColor;

// --- Simplex noise helpers ---
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
```

## Domain Warping

Domain warping creates those lava-lamp, cloud-like shapes by feeding the output of one noise function back as the input coordinates of another:
```glsl
vec2 warp(vec2 p, float t) {
    // First layer of distortion
    vec2 q = vec2(
        snoise(p + vec2(0.0, 0.0) + t * 0.1),
        snoise(p + vec2(5.2, 1.3) + t * 0.1)
    );
    // Second layer — warps the warp
    vec2 r = vec2(
        snoise(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.15),
        snoise(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.15)
    );
    return snoise(p + 4.0 * r + t * 0.05)
         * vec2(1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float n  = snoise(warp(uv * 3.0, u_time) + uv * 2.0);

    // Map noise to a palette
    vec3 col = mix(
        vec3(0.02, 0.02, 0.3),
        vec3(0.9, 0.4, 0.1),
        smoothstep(-0.5, 0.5, n)
    );

    fragColor = vec4(col, 1.0);
}
```

## Parameter Control

The art system exposes parameters via JavaScript uniforms:

| Uniform | Type | Effect |
|---------|------|--------|
| `u_time` | `float` | Animation clock |
| `u_resolution` | `vec2` | Canvas size |
| `u_scale` | `float` | Noise zoom level |
| `u_warp_strength` | `float` | Domain warp intensity |
| `u_palette` | `vec3[4]` | Color stops |
| `u_speed` | `float` | Animation speed |

Changing these at runtime creates entirely different compositions from the same shader code. The "seed" system serializes all uniform values to a compact JSON object that can be shared or bookmarked.

## Performance Notes

- Use `requestAnimationFrame` — never `setInterval` for rendering
- Minimize uniform updates; batch them before the draw call
- For high-DPI screens, render at `devicePixelRatio * 0.75` and upscale via CSS for a 40% GPU load reduction
- Profile with Chrome's `WebGL Inspector` or `Spector.js`

Shaders never stop surprising me. Even tiny changes to the domain warping parameters yield visually distinct, mesmerizing results. Give it a try!