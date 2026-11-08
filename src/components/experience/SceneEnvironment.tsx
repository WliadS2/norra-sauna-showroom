import React, { useMemo } from 'react';
import {
  createStoneTerraceTexture,
  createConcreteFloorTexture,
} from '@/utils/textureGenerator';

interface SceneEnvironmentProps {
  progress: number; // 0.0 to 1.0 (from ScrollTrigger)
  lightingPreset?: 'daylight' | 'interior-warm' | 'evening';
}

export const SceneEnvironment: React.FC<SceneEnvironmentProps> = ({
  progress,
  lightingPreset: _lightingPreset = 'daylight',
}) => {
  // Determine dominant stage
  // 0.00 - 0.25: Alpine Villa Hero & Inspection (Acts 1 & 2)
  // 0.25 - 0.35: Macro Material inspection (Act 3)
  // 0.35 - 0.50: Factory Assembly (Act 4)
  // 0.50 - 0.65: Dark Product Studio (Act 5)
  // 0.65 - 0.75: Shipping & Transport (Acts 6 & 7)
  // 0.75 - 1.00: Swiss Villa Arrival & Final Reveal (Acts 8, 9, 10, 11, 12)

  const isFactory = progress >= 0.32 && progress < 0.52;
  const isStudio = progress >= 0.52 && progress < 0.66;
  const isLogistics = progress >= 0.66 && progress < 0.76;
  const isVilla = !isFactory && !isStudio && !isLogistics;

  // Textures
  const stoneTexture = useMemo(() => createStoneTerraceTexture(), []);
  const concreteTexture = useMemo(() => createConcreteFloorTexture(), []);

  // Studio background color transition
  const studioOpacity = isStudio ? 1 : 0;
  const factoryOpacity = isFactory ? 1 : 0;
  const villaOpacity = isVilla ? 1 : 0;

  return (
    <group name="SceneEnvironments">
      {/* ======================================================== */}
      {/* 1. ALPINE VILLA ENVIRONMENT (Acts 1, 2, 8, 9, 10, 11, 12) */}
      {/* ======================================================== */}
      {villaOpacity > 0 && (
        <group name="AlpineVillaEnv" visible={isVilla}>
          {/* Natural Stone Terrace Floor */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[60, 60]} />
            <meshStandardMaterial
              map={stoneTexture}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>

          {/* Terrace Infinity Pool / Water Feature Border */}
          <mesh position={[0, -0.05, 8]}>
            <boxGeometry args={[18, 0.1, 4]} />
            <meshStandardMaterial
              color="#1B2830"
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>

          {/* Architectural Concrete / Glass Wall of Swiss Residence */}
          <group position={[-7, 2.5, -2]}>
            {/* Charcoal board-marked concrete wall */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 5, 12]} />
              <meshStandardMaterial color="#222321" roughness={0.9} />
            </mesh>
            {/* Architectural cantilever roof overhang */}
            <mesh position={[2.5, 2.6, 0]} castShadow>
              <boxGeometry args={[5, 0.2, 12]} />
              <meshStandardMaterial color="#191A18" roughness={0.7} />
            </mesh>
            {/* Large modern villa window glazing reflecting mountains */}
            <mesh position={[0.16, 0, 1]}>
              <boxGeometry args={[0.02, 3.8, 6]} />
              <meshPhysicalMaterial
                color="#64748B"
                transmission={0.4}
                roughness={0.1}
                reflectivity={0.9}
              />
            </mesh>
          </group>

          {/* Alpine Mountain Silhouette in the distance */}
          <group position={[0, 0, 0]}>
            {/* Distant majestic mountain silhouette */}
            <mesh position={[0, 0, -40]}>
              <planeGeometry args={[120, 45]} />
              <meshBasicMaterial
                color={progress > 0.7 ? '#4B3F38' : '#2A303A'}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Atmospheric mountain haze plane */}
            <mesh position={[0, 6, -30]}>
              <planeGeometry args={[100, 25]} />
              <meshBasicMaterial
                color={progress > 0.7 ? '#C89366' : '#9EA9B6'}
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>

          {/* Alpine Villa Lighting */}
          {progress > 0.7 ? (
            // Warm late-afternoon golden Swiss sun (Acts 8–10)
            <>
              <directionalLight
                position={[12, 14, 8]}
                intensity={2.6}
                color="#FFC285"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={1}
                shadow-camera-far={40}
                shadow-camera-left={-6}
                shadow-camera-right={6}
                shadow-camera-top={6}
                shadow-camera-bottom={-6}
              />
              <ambientLight intensity={0.7} color="#D1B8A3" />
              <hemisphereLight
                args={['#FFE4CE', '#2D2824', 0.8]}
              />
            </>
          ) : (
            // Crisp high-altitude alpine daylight (Acts 1 & 2)
            <>
              <directionalLight
                position={[10, 18, 12]}
                intensity={2.8}
                color="#FFFDF7"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={1}
                shadow-camera-far={40}
                shadow-camera-left={-6}
                shadow-camera-right={6}
                shadow-camera-top={6}
                shadow-camera-bottom={-6}
              />
              <ambientLight intensity={0.9} color="#CCD5DE" />
              <hemisphereLight
                args={['#E5EEF8', '#38332E', 0.9]}
              />
            </>
          )}
        </group>
      )}

      {/* ======================================================== */}
      {/* 2. FACTORY MANUFACTURING ENVIRONMENT (Act 4)             */}
      {/* ======================================================== */}
      {factoryOpacity > 0 && (
        <group name="FactoryEnv" visible={isFactory}>
          {/* Burnished industrial concrete floor */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial
              map={concreteTexture}
              roughness={0.7}
              metalness={0.15}
            />
          </mesh>

          {/* Overhead industrial structural steel trusses */}
          {[-4, 0, 4].map((z, idx) => (
            <group key={idx} position={[0, 6, z]}>
              <mesh castShadow>
                <boxGeometry args={[14, 0.25, 0.25]} />
                <meshStandardMaterial color="#1E201E" metalness={0.8} roughness={0.4} />
              </mesh>
              {/* Suspended high-bay industrial floodlight */}
              <mesh position={[-2, -0.4, 0]}>
                <cylinderGeometry args={[0.3, 0.45, 0.3, 16]} />
                <meshStandardMaterial color="#40423E" metalness={0.9} />
              </mesh>
              <spotLight
                position={[-2, -0.4, 0]}
                target-position={[-2, 0, 0]}
                intensity={3.5}
                color="#FFFFFF"
                angle={0.7}
                penumbra={0.6}
                castShadow
              />
              <mesh position={[2, -0.4, 0]}>
                <cylinderGeometry args={[0.3, 0.45, 0.3, 16]} />
                <meshStandardMaterial color="#40423E" metalness={0.9} />
              </mesh>
              <spotLight
                position={[2, -0.4, 0]}
                target-position={[2, 0, 0]}
                intensity={3.5}
                color="#FFFFFF"
                angle={0.7}
                penumbra={0.6}
                castShadow
              />
            </group>
          ))}

          {/* Precision assembly floor boundary lines (Swiss yellow safety markings) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry args={[2.5, 2.56, 32]} />
            <meshBasicMaterial color="#E2A62C" />
          </mesh>

          {/* Factory ambient work lights */}
          <ambientLight intensity={1.2} color="#D6E0E6" />
          <directionalLight position={[5, 10, 5]} intensity={1.5} color="#F2F5F8" />
        </group>
      )}

      {/* ======================================================== */}
      {/* 3. DARK PRODUCT STUDIO (Act 5)                           */}
      {/* ======================================================== */}
      {studioOpacity > 0 && (
        <group name="ProductStudioEnv" visible={isStudio}>
          {/* Seamless dark infinity cyclorama floor */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial
              color="#111210"
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>

          {/* Studio Key Light (Sculptural top-front angle) */}
          <directionalLight
            position={[4, 7, 5]}
            intensity={2.8}
            color="#FFF2E0"
            castShadow
          />

          {/* Studio Rim Light (Highlights thermowood edges from behind) */}
          <directionalLight
            position={[-5, 5, -6]}
            intensity={4.2}
            color="#8A745C"
          />

          {/* Subtle cool fill light */}
          <directionalLight
            position={[-4, 3, 4]}
            intensity={1.0}
            color="#9BB4C7"
          />

          {/* Moody ambient level */}
          <ambientLight intensity={0.4} color="#333530" />
        </group>
      )}

      {/* ======================================================== */}
      {/* 4. LOGISTICS & SHIPPING SEQUENCE (Acts 6 & 7)             */}
      {/* ======================================================== */}
      {isLogistics && (
        <group name="LogisticsEnv">
          {/* Cargo terminal ground */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial map={concreteTexture} roughness={0.8} />
          </mesh>

          {/* Swiss logistics freight container outline in background */}
          <group position={[0, 1.6, -5]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[8, 3.2, 3]} />
              <meshStandardMaterial color="#272A26" roughness={0.6} metalness={0.5} />
            </mesh>
            {/* White Swiss Cross graphic placeholder on container */}
            <mesh position={[0, 0.4, 1.51]}>
              <planeGeometry args={[1.2, 1.2]} />
              <meshBasicMaterial color="#DC2626" />
            </mesh>
            <mesh position={[0, 0.4, 1.52]}>
              <planeGeometry args={[0.3, 0.8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 0.4, 1.52]}>
              <planeGeometry args={[0.8, 0.3]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Logistics yard lighting */}
          <directionalLight position={[8, 12, 6]} intensity={2.2} color="#F7F2E6" castShadow />
          <ambientLight intensity={0.8} color="#B5BDB7" />
        </group>
      )}
    </group>
  );
};
