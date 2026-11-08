import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  progress: number; // 0.0 to 1.0 scroll progress
  manualControl?: boolean;
  manualPreset?: 'front' | 'corner' | 'interior' | 'macro' | 'reset' | null;
  pointerParallax?: boolean;
}

// Deterministic keyframe waypoints along the continuous narrative scroll
interface Keyframe {
  progress: number;
  camPos: [number, number, number];
  targetPos: [number, number, number];
  fov: number;
}

const NARRATIVE_KEYFRAMES: Keyframe[] = [
  // 0.00: Act 1 - Alpine Hero
  { progress: 0.00, camPos: [3.4, 1.7, 5.0], targetPos: [0.0, 1.1, 0.0], fov: 38 },
  // 0.12: Act 1 - Gentle orbit forward
  { progress: 0.12, camPos: [2.6, 1.5, 4.2], targetPos: [0.0, 1.1, 0.0], fov: 38 },
  // 0.22: Act 2 - Detailed inspection of glass corner & interior view
  { progress: 0.22, camPos: [1.6, 1.35, 2.8], targetPos: [-0.3, 1.0, 0.0], fov: 42 },
  // 0.30: Act 3 - Material Close-Up on Thermowood Grain
  { progress: 0.30, camPos: [-1.45, 1.35, 0.55], targetPos: [-1.30, 1.35, 0.0], fov: 32 },
  // 0.40: Act 4 - Factory Assembly (High angle wide view)
  { progress: 0.40, camPos: [4.0, 3.4, 4.4], targetPos: [0.0, 1.0, 0.0], fov: 44 },
  // 0.48: Act 4 - Factory Assembly completed
  { progress: 0.48, camPos: [3.2, 2.0, 3.8], targetPos: [0.0, 1.1, 0.0], fov: 40 },
  // 0.56: Act 5 - Dark Product Studio
  { progress: 0.56, camPos: [2.8, 1.5, 3.6], targetPos: [0.0, 1.1, 0.0], fov: 38 },
  // 0.64: Act 5 - Studio side orbit
  { progress: 0.64, camPos: [-2.6, 1.6, 3.4], targetPos: [0.0, 1.1, 0.0], fov: 38 },
  // 0.70: Act 6 - Shipping Preparation & Crating
  { progress: 0.70, camPos: [3.2, 2.2, 4.4], targetPos: [0.0, 1.0, 0.0], fov: 42 },
  // 0.78: Act 7 - Freight Journey & Transit
  { progress: 0.78, camPos: [4.2, 2.0, 3.4], targetPos: [0.0, 1.1, 0.0], fov: 40 },
  // 0.86: Act 8 & 9 - Swiss Villa Arrival & Installation (Warm Afternoon)
  { progress: 0.86, camPos: [3.5, 1.8, 4.6], targetPos: [0.0, 1.1, 0.0], fov: 38 },
  // 0.94: Act 10 & 11 - Interactive Configuration Preview
  { progress: 0.94, camPos: [2.4, 1.4, 3.2], targetPos: [0.0, 1.0, 0.0], fov: 40 },
  // 1.00: Act 12 - Final Brand Reveal (Epic Composition)
  { progress: 1.00, camPos: [3.4, 1.6, 4.8], targetPos: [0.0, 1.1, 0.0], fov: 38 },
];

/**
 * Deterministically interpolates camera position, target, and FOV between narrative keyframes
 */
function interpolateKeyframes(p: number): {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
} {
  const clampedP = Math.max(0, Math.min(1, p));

  // Find surrounding keyframes
  let prev = NARRATIVE_KEYFRAMES[0];
  let next = NARRATIVE_KEYFRAMES[NARRATIVE_KEYFRAMES.length - 1];

  for (let i = 0; i < NARRATIVE_KEYFRAMES.length - 1; i++) {
    if (clampedP >= NARRATIVE_KEYFRAMES[i].progress && clampedP <= NARRATIVE_KEYFRAMES[i + 1].progress) {
      prev = NARRATIVE_KEYFRAMES[i];
      next = NARRATIVE_KEYFRAMES[i + 1];
      break;
    }
  }

  const range = next.progress - prev.progress;
  const factor = range > 0 ? (clampedP - prev.progress) / range : 0;
  // Smooth cosine easing between keyframes
  const smoothFactor = 0.5 - 0.5 * Math.cos(factor * Math.PI);

  const pos = new THREE.Vector3(
    THREE.MathUtils.lerp(prev.camPos[0], next.camPos[0], smoothFactor),
    THREE.MathUtils.lerp(prev.camPos[1], next.camPos[1], smoothFactor),
    THREE.MathUtils.lerp(prev.camPos[2], next.camPos[2], smoothFactor)
  );

  const target = new THREE.Vector3(
    THREE.MathUtils.lerp(prev.targetPos[0], next.targetPos[0], smoothFactor),
    THREE.MathUtils.lerp(prev.targetPos[1], next.targetPos[1], smoothFactor),
    THREE.MathUtils.lerp(prev.targetPos[2], next.targetPos[2], smoothFactor)
  );

  const fov = THREE.MathUtils.lerp(prev.fov, next.fov, smoothFactor);

  return { pos, target, fov };
}

export const CameraRig: React.FC<CameraRigProps> = ({
  progress,
  manualControl = false,
  manualPreset: _manualPreset = null,
  pointerParallax = true,
}) => {
  const { camera, size } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 1.1, 0));
  const pointerPos = useRef({ x: 0, y: 0 });

  // Track pointer for subtle cinematic parallax
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalize -1 to +1
      pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  // Responsive FOV adjustment: wider FOV for narrower viewports (mobile) so sauna isn't cropped!
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / Math.max(1, size.height);
      if (aspect < 1.0) {
        // Mobile portrait: increase FOV so product remains fully visible
        camera.fov = 52;
      } else if (aspect < 1.3) {
        camera.fov = 44;
      }
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  useFrame((_, delta) => {
    if (manualControl) {
      // Manual control enabled (e.g. orbit controls or preset override in Act 5)
      return;
    }

    const { pos, target, fov } = interpolateKeyframes(progress);

    // Apply subtle parallax offset based on pointer
    const isMobile = size.width < 768;
    const parallaxStrength = pointerParallax && !isMobile ? 0.25 : 0.05;
    const px = pointerPos.current.x * parallaxStrength;
    const py = -pointerPos.current.y * (parallaxStrength * 0.6);

    const destPos = new THREE.Vector3(pos.x + px, pos.y + py, pos.z);

    // Smooth lerp for buttery camera travel
    const lerpSpeed = Math.min(1.0, delta * 4.5);
    camera.position.lerp(destPos, lerpSpeed);

    currentTarget.current.lerp(target, lerpSpeed);
    camera.lookAt(currentTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const baseFov = isMobile ? fov + 12 : fov;
      camera.fov = THREE.MathUtils.lerp(camera.fov, baseFov, lerpSpeed);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
