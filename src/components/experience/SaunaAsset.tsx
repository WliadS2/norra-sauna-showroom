import React, { useMemo } from 'react';
import * as THREE from 'three';
import { SaunaConfig, SIZE_SPECS } from '@/types/configurator';
import {
  createWoodTexture,
  createWoodNormalMap,
  createWoodRoughnessMap,
} from '@/utils/textureGenerator';

interface SaunaAssetProps {
  config: SaunaConfig;
  explodedProgress?: number; // 0 = assembled, 1 = fully exploded
  interactiveHighlight?: string | null;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export const SaunaAsset: React.FC<SaunaAssetProps> = ({
  config,
  explodedProgress = 0,
  interactiveHighlight: _interactiveHighlight,
  castShadow = true,
  receiveShadow = true,
}) => {
  const specs = SIZE_SPECS[config.size] || SIZE_SPECS.standard;
  const { width: W, height: H, depth: D } = specs;

  // Exterior materials based on config
  const exteriorTextures = useMemo(() => {
    switch (config.exterior) {
      case 'natural-thermowood':
        return {
          map: createWoodTexture({
            baseColor: '#6B4E33',
            grainColor: '#4A3420',
            darkStripeColor: '#302010',
            planks: 14,
          }),
          normalMap: createWoodNormalMap(14),
          roughnessMap: createWoodRoughnessMap(14),
          roughness: 0.7,
        };
      case 'smoked-brown':
        return {
          map: createWoodTexture({
            baseColor: '#3A2E24',
            grainColor: '#241B14',
            darkStripeColor: '#1A120D',
            planks: 14,
          }),
          normalMap: createWoodNormalMap(14),
          roughnessMap: createWoodRoughnessMap(14),
          roughness: 0.65,
        };
      case 'black-thermowood':
      default:
        return {
          map: createWoodTexture({
            baseColor: '#1E1D1B',
            grainColor: '#141312',
            darkStripeColor: '#0A0A09',
            planks: 14,
          }),
          normalMap: createWoodNormalMap(14),
          roughnessMap: createWoodRoughnessMap(14),
          roughness: 0.75,
        };
    }
  }, [config.exterior]);

  // Interior materials based on config
  const interiorTextures = useMemo(() => {
    switch (config.interior) {
      case 'cedar-natural':
        return {
          map: createWoodTexture({
            baseColor: '#A36F52',
            grainColor: '#784E37',
            darkStripeColor: '#5C3824',
            planks: 16,
          }),
          normalMap: createWoodNormalMap(16),
          roughnessMap: createWoodRoughnessMap(16),
          roughness: 0.6,
        };
      case 'dark-timber':
        return {
          map: createWoodTexture({
            baseColor: '#2C2723',
            grainColor: '#1D1916',
            darkStripeColor: '#120F0D',
            planks: 16,
          }),
          normalMap: createWoodNormalMap(16),
          roughnessMap: createWoodRoughnessMap(16),
          roughness: 0.7,
        };
      case 'nordic-light':
      default:
        return {
          map: createWoodTexture({
            baseColor: '#E2D9CC',
            grainColor: '#C4B9A9',
            darkStripeColor: '#A89D8E',
            planks: 16,
          }),
          normalMap: createWoodNormalMap(16),
          roughnessMap: createWoodRoughnessMap(16),
          roughness: 0.55,
        };
    }
  }, [config.interior]);

  // Structural metal material
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#161715',
      roughness: 0.45,
      metalness: 0.85,
    });
  }, []);

  // Bench wood material (Nordic light slats or cedar)
  const benchMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: interiorTextures.map,
      normalMap: interiorTextures.normalMap,
      roughnessMap: interiorTextures.roughnessMap,
      roughness: 0.5,
      metalness: 0.05,
    });
  }, [interiorTextures]);

  // Glass facade material
  const glassMaterial = useMemo(() => {
    if (config.glazing === 'privacy-glass') {
      return new THREE.MeshPhysicalMaterial({
        color: '#263238',
        transparent: true,
        opacity: 0.45,
        roughness: 0.08,
        metalness: 0.6,
        transmission: 0.65,
        ior: 1.6,
        thickness: 0.04,
      });
    }
    return new THREE.MeshPhysicalMaterial({
      color: '#D8ECF8',
      transparent: true,
      opacity: 0.25,
      roughness: 0.03,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.52,
      thickness: 0.03,
    });
  }, [config.glazing]);

  // Explosion displacement factor
  const ep = explodedProgress;

  // Interior light color and intensity
  const interiorLightIntensity = config.lighting === 'daylight' ? 0.6 : config.lighting === 'interior-warm' ? 2.8 : 3.5;
  const interiorLightColor = '#FFA845';

  return (
    <group name="NorraSaunaCube01" position={[0, 0, 0]}>
      {/* 1. STRUCTURAL BASE & FLOOR FRAME */}
      <group position={[0, -ep * 0.4, 0]}>
        {/* Steel chassis base */}
        <mesh position={[0, 0.06, 0]} castShadow={castShadow} receiveShadow={receiveShadow}>
          <boxGeometry args={[W + 0.08, 0.12, D + 0.08]} />
          <primitive object={metalMaterial} attach="material" />
        </mesh>
        {/* Subfloor thermal insulation layer */}
        <mesh position={[0, 0.14, 0]}>
          <boxGeometry args={[W - 0.04, 0.04, D - 0.04]} />
          <meshStandardMaterial color="#2E302C" roughness={0.9} />
        </mesh>
        {/* Interior floor slats / duckboard decking */}
        <mesh position={[0, 0.17, 0]} receiveShadow={receiveShadow}>
          <boxGeometry args={[W - 0.16, 0.02, D - 0.16]} />
          <primitive object={benchMaterial} attach="material" />
        </mesh>
      </group>

      {/* 2. REAR WALL */}
      <group position={[0, 0, -ep * 1.8]}>
        {/* Exterior cladding */}
        <mesh position={[0, H / 2 + 0.12, -D / 2]} castShadow={castShadow} receiveShadow={receiveShadow}>
          <boxGeometry args={[W, H, 0.12]} />
          <meshStandardMaterial
            map={exteriorTextures.map}
            normalMap={exteriorTextures.normalMap}
            roughnessMap={exteriorTextures.roughnessMap}
            roughness={exteriorTextures.roughness}
          />
        </mesh>
        {/* Interior timber lining */}
        <mesh position={[0, H / 2 + 0.12, -D / 2 + 0.07]}>
          <boxGeometry args={[W - 0.16, H - 0.16, 0.02]} />
          <meshStandardMaterial
            map={interiorTextures.map}
            normalMap={interiorTextures.normalMap}
            roughness={interiorTextures.roughness}
          />
        </mesh>
      </group>

      {/* 3. LEFT WALL */}
      <group position={[-ep * 1.8, 0, 0]}>
        {/* Left exterior wall */}
        <mesh position={[-W / 2, H / 2 + 0.12, 0]} castShadow={castShadow} receiveShadow={receiveShadow}>
          <boxGeometry args={[0.12, H, D]} />
          <meshStandardMaterial
            map={exteriorTextures.map}
            normalMap={exteriorTextures.normalMap}
            roughnessMap={exteriorTextures.roughnessMap}
            roughness={exteriorTextures.roughness}
          />
        </mesh>
        {/* Left interior timber lining */}
        <mesh position={[-W / 2 + 0.07, H / 2 + 0.12, 0]}>
          <boxGeometry args={[0.02, H - 0.16, D - 0.16]} />
          <meshStandardMaterial
            map={interiorTextures.map}
            normalMap={interiorTextures.normalMap}
            roughness={interiorTextures.roughness}
          />
        </mesh>
      </group>

      {/* 4. RIGHT WALL (Solid or Corner Glazed) */}
      <group position={[ep * 1.8, 0, 0]}>
        {config.glazing === 'corner-panorama' ? (
          // Corner panorama: right front section is architectural glass
          <>
            {/* Rear solid section of right wall */}
            <mesh position={[W / 2, H / 2 + 0.12, -D / 4]} castShadow={castShadow} receiveShadow={receiveShadow}>
              <boxGeometry args={[0.12, H, D / 2]} />
              <meshStandardMaterial
                map={exteriorTextures.map}
                normalMap={exteriorTextures.normalMap}
                roughnessMap={exteriorTextures.roughnessMap}
                roughness={exteriorTextures.roughness}
              />
            </mesh>
            {/* Front glass section of right wall */}
            <mesh position={[W / 2, H / 2 + 0.12, D / 4]} castShadow={castShadow}>
              <boxGeometry args={[0.02, H - 0.08, D / 2 - 0.04]} />
              <primitive object={glassMaterial} attach="material" />
            </mesh>
            {/* Minimalist framing */}
            <mesh position={[W / 2, H / 2 + 0.12, 0]}>
              <boxGeometry args={[0.04, H, 0.04]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
          </>
        ) : (
          // Full solid right wall
          <>
            <mesh position={[W / 2, H / 2 + 0.12, 0]} castShadow={castShadow} receiveShadow={receiveShadow}>
              <boxGeometry args={[0.12, H, D]} />
              <meshStandardMaterial
                map={exteriorTextures.map}
                normalMap={exteriorTextures.normalMap}
                roughnessMap={exteriorTextures.roughnessMap}
                roughness={exteriorTextures.roughness}
              />
            </mesh>
            <mesh position={[W / 2 - 0.07, H / 2 + 0.12, 0]}>
              <boxGeometry args={[0.02, H - 0.16, D - 0.16]} />
              <meshStandardMaterial
                map={interiorTextures.map}
                normalMap={interiorTextures.normalMap}
                roughness={interiorTextures.roughness}
              />
            </mesh>
          </>
        )}
      </group>

      {/* 5. FRONT PANORAMIC GLASS FACADE & DOOR */}
      <group position={[0, 0, ep * 1.8]}>
        {/* Main front panoramic window panel (Right side) */}
        <mesh position={[W * 0.2, H / 2 + 0.12, D / 2]} castShadow={castShadow}>
          <boxGeometry args={[W * 0.55, H - 0.08, 0.025]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>

        {/* Sauna Glass Door (Left side) */}
        <group position={[-W * 0.28, H / 2 + 0.12, D / 2]}>
          <mesh castShadow={castShadow}>
            <boxGeometry args={[W * 0.38, H - 0.12, 0.02]} />
            <primitive object={glassMaterial} attach="material" />
          </mesh>
          {/* Architectural timber / bronze door handle */}
          <mesh position={[W * 0.14, 0, 0.04]}>
            <cylinderGeometry args={[0.018, 0.018, 0.8, 16]} />
            <meshStandardMaterial color="#8A745C" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[W * 0.14, 0, -0.04]}>
            <cylinderGeometry args={[0.018, 0.018, 0.8, 16]} />
            <meshStandardMaterial color="#C4B9A9" metalness={0.05} roughness={0.4} />
          </mesh>
          {/* Subtle pivot hinges */}
          <mesh position={[-W * 0.18, 0.7, 0]}>
            <boxGeometry args={[0.02, 0.08, 0.04]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh position={[-W * 0.18, -0.7, 0]}>
            <boxGeometry args={[0.02, 0.08, 0.04]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
        </group>

        {/* Front slim architectural frame mullion */}
        <mesh position={[-W * 0.08, H / 2 + 0.12, D / 2]}>
          <boxGeometry args={[0.03, H, 0.05]} />
          <primitive object={metalMaterial} attach="material" />
        </mesh>
      </group>

      {/* 6. STRUCTURAL CORNER POSTS */}
      <group position={[0, 0, 0]}>
        {[
          [-W / 2, -D / 2],
          [W / 2, -D / 2],
          [-W / 2, D / 2],
          [W / 2, D / 2],
        ].map(([cx, cz], idx) => (
          <mesh key={idx} position={[cx, H / 2 + 0.12, cz]} castShadow={castShadow}>
            <boxGeometry args={[0.08, H + 0.04, 0.08]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      {/* 7. ROOF & ARCHITECTURAL TRIM */}
      <group position={[0, ep * 1.6, 0]}>
        {/* Main insulated roof cassette */}
        <mesh position={[0, H + 0.22, 0]} castShadow={castShadow}>
          <boxGeometry args={[W + 0.24, 0.16, D + 0.24]} />
          <meshStandardMaterial
            map={exteriorTextures.map}
            normalMap={exteriorTextures.normalMap}
            roughness={0.8}
          />
        </mesh>
        {/* Roof zinc/black fascia drip edge trim */}
        <mesh position={[0, H + 0.31, 0]}>
          <boxGeometry args={[W + 0.28, 0.04, D + 0.28]} />
          <primitive object={metalMaterial} attach="material" />
        </mesh>
        {/* Interior ceiling timber lining */}
        <mesh position={[0, H + 0.13, 0]}>
          <boxGeometry args={[W - 0.16, 0.02, D - 0.16]} />
          <meshStandardMaterial
            map={interiorTextures.map}
            normalMap={interiorTextures.normalMap}
            roughness={interiorTextures.roughness}
          />
        </mesh>
        {/* Wood-burning chimney flue exit on roof (if wood-burning) */}
        {config.heater === 'wood-burning' && (
          <group position={[-W * 0.3, H + 0.6, -D * 0.25]}>
            <mesh castShadow={castShadow}>
              <cylinderGeometry args={[0.09, 0.09, 0.8, 24]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
            {/* Chimney cowl cap */}
            <mesh position={[0, 0.45, 0]}>
              <coneGeometry args={[0.16, 0.1, 24]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
          </group>
        )}
      </group>

      {/* 8. INTERIOR ARCHITECTURE — FLOATING BENCHES */}
      <group position={[0, ep * 0.3, ep * 0.5]}>
        {/* Upper lounge bench (running along rear wall) */}
        <group position={[0, 0.95, -D * 0.22]}>
          {/* Main bench surface */}
          <mesh castShadow={castShadow} receiveShadow={receiveShadow}>
            <boxGeometry args={[W - 0.24, 0.06, 0.7]} />
            <primitive object={benchMaterial} attach="material" />
          </mesh>
          {/* Ergonomic rounded front lip */}
          <mesh position={[0, -0.04, 0.35]}>
            <boxGeometry args={[W - 0.24, 0.08, 0.03]} />
            <primitive object={benchMaterial} attach="material" />
          </mesh>
        </group>

        {/* Lower step/sitting bench */}
        <group position={[0, 0.5, 0.12]}>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow}>
            <boxGeometry args={[W - 0.24, 0.06, 0.5]} />
            <primitive object={benchMaterial} attach="material" />
          </mesh>
          {/* Vertical bench support ribs */}
          {[-W * 0.3, 0, W * 0.3].map((sx, idx) => (
            <mesh key={idx} position={[sx, -0.22, 0]}>
              <boxGeometry args={[0.04, 0.38, 0.46]} />
              <primitive object={benchMaterial} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Ergonomic Backrest with hidden ambient LED backlighting */}
        <group position={[0, 1.35, -D / 2 + 0.12]}>
          <mesh castShadow={castShadow}>
            <boxGeometry args={[W - 0.24, 0.22, 0.03]} />
            <primitive object={benchMaterial} attach="material" />
          </mesh>
          {/* Architectural hidden warm LED strip */}
          <pointLight
            position={[0, -0.05, 0.05]}
            color={interiorLightColor}
            intensity={interiorLightIntensity}
            distance={2.8}
            decay={2}
          />
          {/* Emissive light strip geometry */}
          <mesh position={[0, -0.09, 0.02]}>
            <boxGeometry args={[W - 0.3, 0.015, 0.015]} />
            <meshBasicMaterial color={interiorLightColor} />
          </mesh>
        </group>

        {/* Curved timber headrests */}
        <mesh position={[-W * 0.3, 1.02, -D * 0.3]} castShadow={castShadow}>
          <boxGeometry args={[0.35, 0.08, 0.25]} />
          <primitive object={benchMaterial} attach="material" />
        </mesh>
        <mesh position={[W * 0.3, 1.02, -D * 0.3]} castShadow={castShadow}>
          <boxGeometry args={[0.35, 0.08, 0.25]} />
          <primitive object={benchMaterial} attach="material" />
        </mesh>
      </group>

      {/* 9. HEATER (ELECTRIC TOWER OR WOOD-BURNING) */}
      <group position={[-W * 0.3, ep * 0.2, D * 0.15]}>
        {config.heater === 'wood-burning' ? (
          // Wood-Burning Stove
          <group position={[0, 0.45, 0]}>
            {/* Stove body */}
            <mesh castShadow={castShadow}>
              <boxGeometry args={[0.42, 0.75, 0.46]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
            {/* Fire door glass with glowing embers */}
            <mesh position={[0, 0, 0.235]}>
              <planeGeometry args={[0.26, 0.32]} />
              <meshBasicMaterial color="#FF6A00" />
            </mesh>
            <pointLight position={[0, 0, 0.28]} color="#FF6A00" intensity={1.5} distance={1.8} decay={2} />
            {/* Stove flue pipe rising to ceiling */}
            <mesh position={[0, 0.65, -0.05]} castShadow={castShadow}>
              <cylinderGeometry args={[0.07, 0.07, 0.6, 24]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
            {/* Thermal protection floor plate */}
            <mesh position={[0, -0.37, 0]}>
              <boxGeometry args={[0.55, 0.01, 0.6]} />
              <primitive object={metalMaterial} attach="material" />
            </mesh>
          </group>
        ) : (
          // Electric Tower Heater
          <group position={[0, 0.52, 0]}>
            {/* Cylindrical stainless/graphite mesh tower */}
            <mesh castShadow={castShadow}>
              <cylinderGeometry args={[0.18, 0.18, 0.85, 24]} />
              <meshStandardMaterial
                color="#1A1C19"
                metalness={0.9}
                roughness={0.25}
                wireframe={false}
              />
            </mesh>
            {/* Safety wooden surround rail */}
            <mesh position={[0, 0.3, 0]}>
              <torusGeometry args={[0.26, 0.025, 12, 32]} />
              <primitive object={benchMaterial} attach="material" />
            </mesh>
            {/* Tower sauna stones cluster */}
            <mesh position={[0, 0.1, 0]}>
              <dodecahedronGeometry args={[0.14, 1]} />
              <meshStandardMaterial color="#333735" roughness={0.95} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.32, 0]}>
              <dodecahedronGeometry args={[0.12, 1]} />
              <meshStandardMaterial color="#2B2D2B" roughness={0.95} metalness={0.1} />
            </mesh>
            {/* Subtle sauna stone glow when active */}
            <pointLight position={[0, 0.2, 0]} color="#FF7E29" intensity={0.8} distance={1.2} decay={2} />
          </group>
        )}
      </group>

      {/* 10. ARCHITECTURAL CONTACT SHADOW PLANE */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[W * 1.5, D * 1.5]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
};
