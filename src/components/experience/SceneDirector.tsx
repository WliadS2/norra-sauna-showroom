import React, { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { SaunaAsset } from './SaunaAsset';
import { SceneEnvironment } from './SceneEnvironment';
import { CameraRig } from './CameraRig';
import { FactorySequence } from './FactorySequence';
import { LogisticsSequence } from './LogisticsSequence';
import { VillaSequence } from './VillaSequence';
import { SaunaConfig } from '@/types/configurator';

interface SceneDirectorProps {
  progress: number; // 0.0 to 1.0 (from GSAP ScrollTrigger)
  config: SaunaConfig;
  manualControl?: boolean;
  manualPreset?: 'front' | 'corner' | 'interior' | 'macro' | 'reset' | null;
  manualExploded?: boolean;
  onPointerParallax?: boolean;
}

export const SceneDirector: React.FC<SceneDirectorProps> = ({
  progress,
  config,
  manualControl = false,
  manualPreset = null,
  manualExploded = false,
  onPointerParallax = true,
}) => {
  // Compute continuous reversible component assembly progress for Act 4
  const explodedProgress = useMemo(() => {
    // If user explicitly toggled manual exploded view (in studio or configurator)
    if (manualExploded) return 0.65;

    // Act 4: Factory Assembly range is progress 0.34 to 0.48
    if (progress >= 0.34 && progress <= 0.48) {
      // 0.34 = 1.0 (fully disassembled into floating components)
      // 0.46 = 0.0 (fully converged into solid assembled sauna)
      const t = (progress - 0.34) / 0.12;
      return Math.max(0, Math.min(1, 1 - t));
    }

    return 0;
  }, [progress, manualExploded]);

  return (
    <>
      {/* Narrative Camera Rig */}
      <CameraRig
        progress={progress}
        manualControl={manualControl}
        manualPreset={manualPreset}
        pointerParallax={onPointerParallax}
      />

      {/* Manual Orbit Controls when visitor engages interactive mode in Studio (Act 5) or Configurator */}
      {manualControl && (
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={1.8}
          maxDistance={8.0}
          minPolarAngle={Math.PI / 12}
          maxPolarAngle={Math.PI / 2 + 0.05}
          target={[0, 1.1, 0]}
        />
      )}

      {/* Dynamic 3D Environments & Lighting */}
      <SceneEnvironment
        progress={progress}
        lightingPreset={config.lighting}
      />

      {/* Sequences for Factory, Logistics, Villa */}
      <FactorySequence progress={progress} />
      <LogisticsSequence progress={progress} />
      <VillaSequence progress={progress} />

      {/* THE ONE PERSISTENT SAUNA PRODUCT */}
      <SaunaAsset
        config={config}
        explodedProgress={explodedProgress}
        castShadow
        receiveShadow
      />
    </>
  );
};
