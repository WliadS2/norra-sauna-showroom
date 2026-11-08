import React from 'react';

interface LogisticsSequenceProps {
  progress: number;
}

export const LogisticsSequence: React.FC<LogisticsSequenceProps> = ({ progress }) => {
  const isVisible = progress >= 0.65 && progress <= 0.78;
  if (!isVisible) return null;

  // Logistics staging: heavy transport pallet beneath sauna
  return (
    <group name="LogisticsSequenceElements">
      {/* Heavy-duty industrial transport pallet base */}
      <group position={[0, -0.08, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[3.0, 0.14, 2.7]} />
          <meshStandardMaterial color="#5C4834" roughness={0.9} />
        </mesh>
        {/* Steel fork pockets */}
        <mesh position={[0, -0.02, 0.6]}>
          <boxGeometry args={[3.05, 0.08, 0.2]} />
          <meshStandardMaterial color="#1A1C1A" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.02, -0.6]}>
          <boxGeometry args={[3.05, 0.08, 0.2]} />
          <meshStandardMaterial color="#1A1C1A" metalness={0.8} />
        </mesh>
      </group>

      {/* Protective transport corner buffers (Swiss high-density foam buffers) */}
      {[
        [-1.38, -1.22],
        [1.38, -1.22],
        [-1.38, 1.22],
        [1.38, 1.22],
      ].map(([cx, cz], idx) => (
        <mesh key={idx} position={[cx, 1.1, cz]}>
          <boxGeometry args={[0.15, 2.3, 0.15]} />
          <meshStandardMaterial color="#30332E" roughness={0.7} />
        </mesh>
      ))}

      {/* Industrial tension securing straps */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[2.72, 0.04, 0.08]} />
        <meshStandardMaterial color="#E2A62C" roughness={0.6} />
      </mesh>
    </group>
  );
};
