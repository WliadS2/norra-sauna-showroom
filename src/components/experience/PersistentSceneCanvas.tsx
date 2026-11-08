import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneDirector } from './SceneDirector';
import { SaunaConfig, DEFAULT_CONFIG } from '@/types/configurator';

interface PersistentSceneCanvasProps {
  progress: number;
  config?: SaunaConfig;
  manualControl?: boolean;
  manualPreset?: 'front' | 'corner' | 'interior' | 'macro' | 'reset' | null;
  manualExploded?: boolean;
}

export const PersistentSceneCanvas: React.FC<PersistentSceneCanvasProps> = ({
  progress,
  config = DEFAULT_CONFIG,
  manualControl = false,
  manualPreset = null,
  manualExploded = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setDimensions] = useState({ width: 0, height: 0 });
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL availability safely
  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Viewport sizing via ResizeObserver: ensures Canvas NEVER falls back to 300px default
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({
            width: Math.floor(rect.width),
            height: Math.floor(rect.height),
          });
        }
      }
    };

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => updateSize());
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateSize, { passive: true });
    return () => {
      window.removeEventListener('resize', updateSize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-charcoal text-warmWhite p-8 text-center">
        <div className="max-w-md border border-warmWhite/20 p-8 bg-graphite/80 backdrop-blur-md">
          <h3 className="font-serif text-2xl mb-4">NØRRA SAUNA</h3>
          <p className="text-sm text-warmWhite/70 mb-4">
            WebGL 3D-Beschleunigung ist in diesem Browser nicht aktiviert. Bitte aktivieren Sie Hardwarebeschleunigung für das vollständige alpine 3D-Erlebnis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="norra-persistent-canvas-wrapper"
      data-testid="norra-canvas-wrapper"
      className={`fixed inset-0 z-0 w-screen h-screen overflow-hidden ${
        manualControl ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Canvas
        dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          alpha: false,
        }}
        camera={{
          fov: 38,
          near: 0.1,
          far: 200,
          position: [3.4, 1.7, 5.0],
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <SceneDirector
          progress={progress}
          config={config}
          manualControl={manualControl}
          manualPreset={manualPreset}
          manualExploded={manualExploded}
        />
      </Canvas>
    </div>
  );
};
