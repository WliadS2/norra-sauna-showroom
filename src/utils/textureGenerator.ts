import * as THREE from 'three';

// Cache generated textures to avoid redundant canvas rendering
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Creates high-fidelity procedural wood plank diffuse texture
 */
export function createWoodTexture(options: {
  baseColor: string;
  grainColor: string;
  darkStripeColor: string;
  planks?: number;
  width?: number;
  height?: number;
}): THREE.CanvasTexture {
  const key = `wood_${options.baseColor}_${options.grainColor}_${options.planks || 12}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const width = options.width || 1024;
  const height = options.height || 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const dummy = new THREE.CanvasTexture(canvas);
    return dummy;
  }

  // Base timber color
  ctx.fillStyle = options.baseColor;
  ctx.fillRect(0, 0, width, height);

  const planks = options.planks || 12;
  const plankWidth = width / planks;

  for (let p = 0; p < planks; p++) {
    const startX = p * plankWidth;
    
    // Per-plank subtle shade variation
    ctx.fillStyle = (p % 2 === 0) ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(startX, 0, plankWidth, height);

    // Fine vertical wood grain fibers
    ctx.strokeStyle = options.grainColor;
    const fiberCount = Math.floor(plankWidth * 0.8);
    for (let f = 0; f < fiberCount; f++) {
      const fx = startX + Math.random() * plankWidth;
      const alpha = 0.05 + Math.random() * 0.15;
      ctx.strokeStyle = options.grainColor;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 0.8 + Math.random() * 1.5;
      ctx.beginPath();
      // Organic wavy grain
      ctx.moveTo(fx, 0);
      const wave = (Math.random() - 0.5) * 6;
      ctx.bezierCurveTo(
        fx + wave, height * 0.3,
        fx - wave, height * 0.7,
        fx + (Math.random() - 0.5) * 4, height
      );
      ctx.stroke();
    }

    // Occasional darker wood grain streaks
    for (let s = 0; s < 3; s++) {
      const sx = startX + Math.random() * plankWidth;
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = options.darkStripeColor;
      ctx.lineWidth = 2 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx + (Math.random() - 0.5) * 8, height);
      ctx.stroke();
    }

    // Plank separation seam / bevel shadow
    ctx.globalAlpha = 1.0;
    // Dark seam shadow line
    ctx.fillStyle = '#0a0a09';
    ctx.fillRect(startX, 0, 2.5, height);
    // Subtle bevel highlight next to groove
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.fillRect(startX + 2.5, 0, 1.5, height);
  }

  ctx.globalAlpha = 1.0;
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Creates normal map for wood planks with deep grooves and grain micro-relief
 */
export function createWoodNormalMap(planks = 12, width = 1024, height = 1024): THREE.CanvasTexture {
  const key = `wood_normal_${planks}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Default flat normal in tangent space is RGB(128, 128, 255)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, width, height);

  const plankWidth = width / planks;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const localX = x % plankWidth;

      // Plank bevel groove: left edge slopes right, right edge slopes left
      let nx = 128;
      const ny = 128;
      let nz = 255;

      if (localX < 4) {
        // Left bevel edge points left (nx < 128)
        nx = 70 + localX * 14;
        nz = 220;
      } else if (localX > plankWidth - 4) {
        // Right bevel edge points right (nx > 128)
        nx = 186 - (plankWidth - localX) * 14;
        nz = 220;
      } else {
        // Fine grain micro-noise
        const grainNoise = ((x * 13 + y * 37) % 17) - 8;
        nx = 128 + grainNoise;
      }

      data[idx] = Math.min(255, Math.max(0, nx));
      data[idx + 1] = Math.min(255, Math.max(0, ny));
      data[idx + 2] = Math.min(255, Math.max(0, nz));
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Creates wood roughness map
 */
export function createWoodRoughnessMap(planks = 12, width = 512, height = 512): THREE.CanvasTexture {
  const key = `wood_roughness_${planks}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Matte thermowood base (~0.65 roughness = rgb(165,165,165))
  ctx.fillStyle = 'rgb(165, 165, 165)';
  ctx.fillRect(0, 0, width, height);

  const plankWidth = width / planks;
  for (let p = 0; p < planks; p++) {
    const px = p * plankWidth;
    // Darker seam is slightly smoother or rougher
    ctx.fillStyle = 'rgb(190, 190, 190)';
    ctx.fillRect(px, 0, 3, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Travertine stone terrace texture for alpine villa terrace
 */
export function createStoneTerraceTexture(width = 1024, height = 1024): THREE.CanvasTexture {
  const key = 'stone_terrace';
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm natural limestone / travertine base
  ctx.fillStyle = '#C8BFB1';
  ctx.fillRect(0, 0, width, height);

  // Grid tiles: large architectural slabs (e.g. 120cm x 60cm proportion)
  const tileSizeX = width / 4;
  const tileSizeY = height / 4;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const tx = i * tileSizeX;
      const ty = j * tileSizeY;

      // Slight tone variance per stone slab
      ctx.fillStyle = ((i + j) % 2 === 0) ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)';
      ctx.fillRect(tx, ty, tileSizeX, tileSizeY);

      // Organic travertine clouding / pore flecks
      for (let k = 0; k < 60; k++) {
        const spotX = tx + Math.random() * tileSizeX;
        const spotY = ty + Math.random() * tileSizeY;
        const radius = 1 + Math.random() * 8;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(160, 150, 138, 0.2)' : 'rgba(235, 230, 222, 0.25)';
        ctx.beginPath();
        ctx.ellipse(spotX, spotY, radius, radius * 0.4, (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Tile grout joint (precise 3mm architectural joint)
      ctx.strokeStyle = '#8E867A';
      ctx.lineWidth = 3;
      ctx.strokeRect(tx, ty, tileSizeX, tileSizeY);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  textureCache.set(key, texture);
  return texture;
}

/**
 * Concrete industrial floor texture for factory and logistics sequences
 */
export function createConcreteFloorTexture(width = 512, height = 512): THREE.CanvasTexture {
  const key = 'concrete_floor';
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Industrial burnished grey concrete
  ctx.fillStyle = '#222320';
  ctx.fillRect(0, 0, width, height);

  // Aggregate specks
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.15)';
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }

  // Expansion joint lines
  ctx.strokeStyle = '#151614';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  textureCache.set(key, texture);
  return texture;
}
