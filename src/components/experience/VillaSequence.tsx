import React from 'react';

interface VillaSequenceProps {
  progress: number;
}

export const VillaSequence: React.FC<VillaSequenceProps> = ({ progress }) => {
  // Visible during Villa states
  const isVilla = progress < 0.32 || progress > 0.78;
  if (!isVilla) return null;

  return (
    <group name="VillaSequenceElements">
      {/* Modern architectural outdoor sconce lamp on villa wall */}
      <group position={[-6.8, 2.2, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 0.45, 0.12]} />
          <meshStandardMaterial color="#111210" metalness={0.9} />
        </mesh>
        <pointLight
          position={[0.1, 0, 0]}
          color="#FFD1A4"
          intensity={progress > 0.7 ? 1.8 : 0.4}
          distance={4}
          decay={2}
        />
      </group>

      {/* Travertine step border leading to terrace edge */}
      <mesh position={[0, -0.08, 12]} receiveShadow>
        <boxGeometry args={[30, 0.16, 2]} />
        <meshStandardMaterial color="#A89E90" roughness={0.9} />
      </mesh>
    </group>
  );
};
