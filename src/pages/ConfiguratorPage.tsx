import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import {
  Compass,
  Layers,
  RotateCcw,
  Save,
  Check,
  FileText,
  Share2,
  Flame,
  Sun,
  ArrowRight,
} from 'lucide-react';
import { SaunaAsset } from '@/components/experience/SaunaAsset';
import { SceneEnvironment } from '@/components/experience/SceneEnvironment';
import {
  SaunaConfig,
  DEFAULT_CONFIG,
  EXTERIOR_OPTIONS,
  INTERIOR_OPTIONS,
  GLAZING_OPTIONS,
  HEATER_OPTIONS,
  LIGHTING_PRESETS,
  SIZE_SPECS,
  SaunaSize,
  calculateConfigPrice,
  formatCHF,
} from '@/types/configurator';

export const ConfiguratorPage: React.FC = () => {
  // Load saved configuration from localStorage if available
  const [config, setConfig] = useState<SaunaConfig>(() => {
    try {
      const saved = localStorage.getItem('norra_saved_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [explodedView, setExplodedView] = useState(false);
  const [activeTab, setActiveTab] = useState<'size' | 'exterior' | 'interior' | 'glazing' | 'heater' | 'lighting'>('size');
  const [savedNotice, setSavedNotice] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Orbit controls reference to programmatically change camera view
  const controlsRef = useRef<any>(null);

  // Save to localStorage
  const handleSaveLocal = () => {
    try {
      localStorage.setItem('norra_saved_config', JSON.stringify(config));
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setExplodedView(false);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Camera preset positions
  const setCameraPreset = (preset: 'exterior' | 'front' | 'corner' | 'interior' | 'top') => {
    if (!controlsRef.current) return;
    const camera = controlsRef.current.object;
    if (!camera) return;

    switch (preset) {
      case 'front':
        camera.position.set(0, 1.3, 3.8);
        controlsRef.current.target.set(0, 1.1, 0);
        break;
      case 'corner':
        camera.position.set(2.4, 1.3, 2.6);
        controlsRef.current.target.set(0, 1.0, 0);
        break;
      case 'interior':
        camera.position.set(0.2, 1.25, 1.2);
        controlsRef.current.target.set(0, 1.1, -0.6);
        break;
      case 'top':
        camera.position.set(0.1, 5.5, 0.1);
        controlsRef.current.target.set(0, 0, 0);
        break;
      case 'exterior':
      default:
        camera.position.set(3.4, 1.8, 4.2);
        controlsRef.current.target.set(0, 1.1, 0);
        break;
    }
    controlsRef.current.update();
  };

  const totalPrice = calculateConfigPrice(config);
  const currentSizeSpec = SIZE_SPECS[config.size];

  return (
    <div className="relative min-h-screen bg-charcoal text-warmWhite pt-20 flex flex-col">
      {/* Top Header Bar */}
      <div className="border-b border-warmWhite/10 bg-charcoal/95 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-bronze uppercase">
            Echtzeit 3D-Konfigurator
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-warmWhite">
            NØRRA CUBE 01
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-mono text-warmWhite/50 uppercase block">
              Richtpreis (CHF inkl. MwSt.)
            </span>
            <span className="font-mono text-xl sm:text-2xl text-bronze font-bold">
              {formatCHF(totalPrice)}
            </span>
          </div>

          <button
            onClick={() => setShowSummaryModal(true)}
            className="px-5 py-2.5 bg-warmWhite text-charcoal hover:bg-bronze hover:text-white transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Offerte Zusammenfassung</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: 70% 3D Viewport on Desktop / 30% Configuration Controls */}
      <div className="flex-1 flex flex-col lg:flex-row relative">

        {/* ========================================================= */}
        {/* LEFT / MAIN: 70% 3D INTERACTIVE VIEWPORT                  */}
        {/* ========================================================= */}
        <div
          id="configurator-canvas-wrapper"
          className="w-full lg:w-[70%] h-[55vh] lg:h-auto min-h-[450px] relative bg-charcoal overflow-hidden"
        >
          {/* Floating Viewport Quick Controls */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <div className="bg-charcoal/80 border border-warmWhite/20 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-warmWhite/80 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-bronze animate-spin-slow" />
              <span>360° Drehen mit Maus/Touch</span>
            </div>

            <button
              onClick={() => setExplodedView(!explodedView)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border backdrop-blur-md transition-colors flex items-center gap-2 ${
                explodedView
                  ? 'bg-bronze text-white border-bronze'
                  : 'bg-charcoal/80 text-warmWhite border-warmWhite/20 hover:border-bronze'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{explodedView ? 'Zusammenfügen' : 'Explosionsansicht'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 bg-charcoal/80 border border-warmWhite/20 backdrop-blur-md hover:border-bronze text-warmWhite transition-colors"
              title="Standard wiederherstellen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Camera Preset Toolbar Bottom-Left */}
          <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-1 bg-charcoal/85 border border-warmWhite/20 backdrop-blur-md p-1.5">
            <span className="font-mono text-[10px] text-warmWhite/40 uppercase px-2">Kamera:</span>
            <button
              onClick={() => setCameraPreset('exterior')}
              className="px-2.5 py-1 text-xs font-mono hover:bg-graphite text-warmWhite transition-colors"
            >
              3/4 Perspektive
            </button>
            <button
              onClick={() => setCameraPreset('front')}
              className="px-2.5 py-1 text-xs font-mono hover:bg-graphite text-warmWhite transition-colors"
            >
              Front
            </button>
            <button
              onClick={() => setCameraPreset('corner')}
              className="px-2.5 py-1 text-xs font-mono hover:bg-graphite text-warmWhite transition-colors"
            >
              Ecke
            </button>
            <button
              onClick={() => setCameraPreset('interior')}
              className="px-2.5 py-1 text-xs font-mono hover:bg-graphite text-warmWhite transition-colors"
            >
              Interieur
            </button>
            <button
              onClick={() => setCameraPreset('top')}
              className="px-2.5 py-1 text-xs font-mono hover:bg-graphite text-warmWhite transition-colors"
            >
              Draufsicht
            </button>
          </div>

          {/* Dimensions Floating Badge Bottom-Right */}
          <div className="absolute bottom-4 right-4 z-20 bg-charcoal/85 border border-warmWhite/20 backdrop-blur-md px-3 py-2 text-right font-mono text-xs text-warmWhite/80">
            <div className="text-[10px] text-bronze uppercase">Abmessungen</div>
            <div>{currentSizeSpec.width}m B × {currentSizeSpec.depth}m T × {currentSizeSpec.height}m H</div>
          </div>

          {/* Three.js Canvas */}
          <Canvas
            dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
            shadows={{ type: THREE.PCFSoftShadowMap }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
            }}
            camera={{
              fov: 40,
              near: 0.1,
              far: 150,
              position: [3.4, 1.8, 4.2],
            }}
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <OrbitControls
              ref={controlsRef}
              makeDefault
              enableDamping
              dampingFactor={0.06}
              minDistance={1.8}
              maxDistance={7.5}
              minPolarAngle={Math.PI / 12}
              maxPolarAngle={Math.PI / 2 + 0.05}
              target={[0, 1.1, 0]}
            />

            {/* Alpine Environment Lighting */}
            <SceneEnvironment
              progress={config.lighting === 'evening' ? 0.85 : 0.05}
              lightingPreset={config.lighting}
            />

            {/* Reusable High-Fidelity 3D Sauna Asset */}
            <SaunaAsset
              config={config}
              explodedProgress={explodedView ? 0.7 : 0}
              castShadow
              receiveShadow
            />
          </Canvas>
        </div>

        {/* ========================================================= */}
        {/* RIGHT: 30% CONFIGURATION CONTROLS PANEL                   */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[30%] bg-graphite/40 border-l border-warmWhite/10 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-160px)]">
          <div className="p-6">
            {/* Category Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-charcoal border border-warmWhite/15 mb-6 text-xs font-mono uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('size')}
                className={`py-2 text-center transition-colors ${
                  activeTab === 'size' ? 'bg-bronze text-white font-semibold' : 'text-warmWhite/60 hover:text-warmWhite'
                }`}
              >
                Grösse
              </button>
              <button
                onClick={() => setActiveTab('exterior')}
                className={`py-2 text-center transition-colors ${
                  activeTab === 'exterior' ? 'bg-bronze text-white font-semibold' : 'text-warmWhite/60 hover:text-warmWhite'
                }`}
              >
                Aussen
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`py-2 text-center transition-colors ${
                  activeTab === 'interior' ? 'bg-bronze text-white font-semibold' : 'text-warmWhite/60 hover:text-warmWhite'
                }`}
              >
                Innen
              </button>
              <button
                onClick={() => setActiveTab('glazing')}
                className={`py-2 text-center transition-colors ${
                  activeTab === 'glazing' ? 'bg-bronze text-white font-semibold' : 'text-warmWhite/60 hover:text-warmWhite'
                }`}
              >
                Glas
              </button>
              <button
                onClick={() => setActiveTab('heater')}
                className={`py-2 text-center transition-colors ${
                  activeTab === 'heater' ? 'bg-bronze text-white font-semibold' : 'text-warmWhite/60 hover:text-warmWhite'
                }`}
              >
                Ofen
              </button>
              <button
                onClick={() => setActiveTab('lighting')}
                className={`py-2 text-center transition-colors ${
                  activeTab === 'lighting' ? 'bg-bronze text-white font-semibold' : 'text-warmWhite/60 hover:text-warmWhite'
                }`}
              >
                Licht
              </button>
            </div>

            {/* TAB CONTENT */}

            {/* 1. SIZE TAB */}
            {activeTab === 'size' && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Kubus-Dimension
                </span>
                {(['compact', 'standard', 'grand'] as SaunaSize[]).map((sz) => {
                  const spec = SIZE_SPECS[sz];
                  const isSelected = config.size === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setConfig({ ...config, size: sz })}
                      className={`w-full p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-bronze bg-charcoal shadow-lg'
                          : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-warmWhite">
                          {sz === 'compact' ? 'CUBE 01 Kompakt' : sz === 'standard' ? 'CUBE 01 Standard' : 'CUBE 01 Grand'}
                        </span>
                        <span className="font-mono text-xs text-bronze font-bold">
                          {formatCHF(spec.basePriceCHF)}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-warmWhite/60">
                        {spec.label}
                      </div>
                      <div className="text-xs font-mono text-warmWhite/40 mt-2">
                        {spec.width}m × {spec.depth}m × {spec.height}m
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. EXTERIOR TAB */}
            {activeTab === 'exterior' && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Fassaden-Thermoholz
                </span>
                {EXTERIOR_OPTIONS.map((ext) => {
                  const isSelected = config.exterior === ext.id;
                  return (
                    <button
                      key={ext.id}
                      onClick={() => setConfig({ ...config, exterior: ext.id })}
                      className={`w-full p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-bronze bg-charcoal shadow-lg'
                          : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full border border-warmWhite/30 shadow-inner"
                            style={{ backgroundColor: ext.colorHex }}
                          />
                          <span className="font-serif text-lg text-warmWhite">{ext.name}</span>
                        </div>
                        <span className="font-mono text-xs text-bronze">
                          {ext.priceDeltaCHF === 0 ? 'Inklusive' : `+ ${formatCHF(ext.priceDeltaCHF)}`}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-warmWhite/60 mb-2">
                        {ext.tagline}
                      </div>
                      <p className="text-xs font-sans text-warmWhite/75 leading-relaxed">
                        {ext.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. INTERIOR TAB */}
            {activeTab === 'interior' && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Saunaholz Innenraum & Bänke
                </span>
                {INTERIOR_OPTIONS.map((int) => {
                  const isSelected = config.interior === int.id;
                  return (
                    <button
                      key={int.id}
                      onClick={() => setConfig({ ...config, interior: int.id })}
                      className={`w-full p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-bronze bg-charcoal shadow-lg'
                          : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full border border-warmWhite/30 shadow-inner"
                            style={{ backgroundColor: int.colorHex }}
                          />
                          <span className="font-serif text-lg text-warmWhite">{int.name}</span>
                        </div>
                        <span className="font-mono text-xs text-bronze">
                          {int.priceDeltaCHF === 0 ? 'Inklusive' : `+ ${formatCHF(int.priceDeltaCHF)}`}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-warmWhite/60 mb-2">
                        {int.tagline}
                      </div>
                      <p className="text-xs font-sans text-warmWhite/75 leading-relaxed">
                        {int.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. GLAZING TAB */}
            {activeTab === 'glazing' && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Architekturverglasung
                </span>
                {GLAZING_OPTIONS.map((glz) => {
                  const isSelected = config.glazing === glz.id;
                  return (
                    <button
                      key={glz.id}
                      onClick={() => setConfig({ ...config, glazing: glz.id })}
                      className={`w-full p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-bronze bg-charcoal shadow-lg'
                          : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-warmWhite">{glz.name}</span>
                        <span className="font-mono text-xs text-bronze">
                          {glz.priceDeltaCHF === 0 ? 'Inklusive' : `+ ${formatCHF(glz.priceDeltaCHF)}`}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-warmWhite/60 mb-2">
                        {glz.tagline}
                      </div>
                      <p className="text-xs font-sans text-warmWhite/75 leading-relaxed">
                        {glz.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 5. HEATER TAB */}
            {activeTab === 'heater' && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Heizkonzept & Ofentechnik
                </span>
                {HEATER_OPTIONS.map((htr) => {
                  const isSelected = config.heater === htr.id;
                  return (
                    <button
                      key={htr.id}
                      onClick={() => setConfig({ ...config, heater: htr.id })}
                      className={`w-full p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-bronze bg-charcoal shadow-lg'
                          : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-bronze" />
                          <span className="font-serif text-lg text-warmWhite">{htr.name}</span>
                        </div>
                        <span className="font-mono text-xs text-bronze">
                          {htr.priceDeltaCHF === 0 ? 'Inklusive' : `+ ${formatCHF(htr.priceDeltaCHF)}`}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-warmWhite/60 mb-2">
                        {htr.tagline}
                      </div>
                      <p className="text-xs font-sans text-warmWhite/75 leading-relaxed">
                        {htr.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 6. LIGHTING TAB */}
            {activeTab === 'lighting' && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Atmosphäre & Lichtstimmung
                </span>
                {LIGHTING_PRESETS.map((lt) => {
                  const isSelected = config.lighting === lt.id;
                  return (
                    <button
                      key={lt.id}
                      onClick={() => setConfig({ ...config, lighting: lt.id })}
                      className={`w-full p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-bronze bg-charcoal shadow-lg'
                          : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4 text-bronze" />
                          <span className="font-serif text-lg text-warmWhite">{lt.name}</span>
                        </div>
                      </div>
                      <p className="text-xs font-sans text-warmWhite/75 leading-relaxed">
                        {lt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Actions Bar */}
          <div className="p-6 border-t border-warmWhite/10 bg-charcoal/80 space-y-3">
            <button
              onClick={handleSaveLocal}
              className="w-full py-3 bg-graphite border border-warmWhite/20 hover:border-bronze text-warmWhite text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Konfiguration lokal gespeichert</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-bronze" />
                  <span>Konfiguration merken (Lokal)</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowSummaryModal(true)}
              className="w-full py-3.5 bg-bronze text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>Richtpreis-Offerte Erstellen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SUMMARY / QUOTATION MODAL                                 */}
      {/* ========================================================= */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-charcoal border border-warmWhite/25 p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-warmWhite/15 pb-4 mb-6">
              <div>
                <span className="font-mono text-xs tracking-widest text-bronze uppercase">
                  NØRRA SAUNA SCHWEIZ
                </span>
                <h3 className="font-serif text-2xl text-warmWhite mt-1">
                  Ihre CUBE 01 Zusammenfassung
                </h3>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-warmWhite/60 hover:text-warmWhite font-mono text-sm"
              >
                ✕ Schliessen
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs border-b border-warmWhite/10 pb-6 mb-6">
              <div className="flex justify-between py-1">
                <span className="text-warmWhite/60">Modell:</span>
                <span className="text-warmWhite font-medium">NØRRA CUBE 01 ({currentSizeSpec.label})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warmWhite/60">Aussenfassade:</span>
                <span className="text-warmWhite font-medium">
                  {EXTERIOR_OPTIONS.find((e) => e.id === config.exterior)?.name}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warmWhite/60">Innenraum:</span>
                <span className="text-warmWhite font-medium">
                  {INTERIOR_OPTIONS.find((i) => i.id === config.interior)?.name}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warmWhite/60">Verglasung:</span>
                <span className="text-warmWhite font-medium">
                  {GLAZING_OPTIONS.find((g) => g.id === config.glazing)?.name}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warmWhite/60">Heizsystem:</span>
                <span className="text-warmWhite font-medium">
                  {HEATER_OPTIONS.find((h) => h.id === config.heater)?.name}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warmWhite/60">Abmessungen:</span>
                <span className="text-warmWhite font-medium">
                  {currentSizeSpec.width}m × {currentSizeSpec.depth}m × {currentSizeSpec.height}m
                </span>
              </div>
            </div>

            <div className="bg-graphite p-4 border border-warmWhite/15 flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-warmWhite/70">
                Gesamter Richtpreis (CHF)
              </span>
              <span className="font-mono text-2xl text-bronze font-bold">
                {formatCHF(totalPrice)}
              </span>
            </div>

            <p className="text-[11px] font-sans text-warmWhite/50 mb-6 leading-relaxed">
              Hinweis: Dies ist eine unverbindliche Richtpreis-Kalkulation (CHF inkl. Schweizer MwSt.). Montage vor Ort, Fundamentarbeiten und allfälliger Helikoptertransport werden nach Besichtigung separat offeriert.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/offerte"
                onClick={() => setShowSummaryModal(false)}
                className="flex-1 py-3 bg-bronze text-white text-center text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all"
              >
                Offerte Im Detail Anfordern
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `NØRRA SAUNA CUBE 01 Konfiguration:\nGrösse: ${currentSizeSpec.label}\nFassade: ${config.exterior}\nInterieur: ${config.interior}\nVerglasung: ${config.glazing}\nOfen: ${config.heater}\nRichtpreis: ${formatCHF(totalPrice)}`
                  );
                  setCopiedNotice(true);
                  setTimeout(() => setCopiedNotice(false), 2000);
                }}
                className="px-4 py-3 bg-graphite border border-warmWhite/20 text-warmWhite text-xs font-mono uppercase tracking-widest hover:border-bronze transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedNotice ? 'Kopiert!' : 'Kopieren'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
