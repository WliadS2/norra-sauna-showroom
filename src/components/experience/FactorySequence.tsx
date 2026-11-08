import React from 'react';

interface FactorySequenceProps {
  progress: number;
}

export const FactorySequence: React.FC<FactorySequenceProps> = ({ progress }) => {
  const isVisible = progress >= 0.32 && progress <= 0.52;
  if (!isVisible) return null;

  // Normalized factory progress: 0 at 0.35, 1 at 0.48
  const factoryProgress = Math.max(0, Math.min(1, (progress - 0.35) / 0.13));

  return (
    <group name="FactorySequenceElements">
      {/* Precision robotic assembly guide rail */}
      <mesh position={[0, 0.02, 3]} receiveShadow>
        <boxGeometry args={[8, 0.04, 0.3]} />
        <meshStandardMaterial color="#30322E" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Assembly status laser line across floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[2.8, 2.82, 64]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
      </mesh>

      {/* Overhead precision crane hook hovering above */}
      <group position={[0, 4.2 - factoryProgress * 0.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 2.5, 12]} />
          <meshStandardMaterial color="#1E201E" metalness={0.9} />
        </mesh>
        <mesh position={[0, -1.3, 0]}>
          <boxGeometry args={[0.3, 0.25, 0.3]} />
          <meshStandardMaterial color="#E2A62C" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
