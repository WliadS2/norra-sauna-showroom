import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Shield, Droplets, Sun, Layers } from 'lucide-react';
import { SaunaAsset } from '@/components/experience/SaunaAsset';
import { SceneEnvironment } from '@/components/experience/SceneEnvironment';
import { DEFAULT_CONFIG, formatCHF } from '@/types/configurator';

export const ProductDetailPage: React.FC = () => {
  const [exploded, setExploded] = useState(false);

  const features = [
    {
      title: 'Monolithischer Baukörper',
      desc: 'Rahmenlos integrierte 3-fach Isolierverglasung trifft auf tiefschwarz karbonisiertes Thermoholz.',
      icon: Layers,
    },
    {
      title: 'Schweizer Klimabeständigkeit',
      desc: 'Für extreme Temperaturschwankungen von -30°C bis +35°C und Schneelasten bis 350 kg/m² konstruiert.',
      icon: Shield,
    },
    {
      title: 'Ergonomische Schwebende Bänke',
      desc: 'Zweistufige Liegeebenen aus astfreier Polarespe mit samtweicher, splitterfreier Oberfläche.',
      icon: Sun,
    },
    {
      title: 'Verdeckte Belüftung & Entwässerung',
      desc: 'Integrierte Konvektionsschlitze und integrierte Bodenentwässerung für perfekte Aufguss-Hygiene.',
      icon: Droplets,
    },
  ];

  const specs = [
    { label: 'Aussenmasse (Standard)', value: '2.60 m × 2.30 m × 2.35 m' },
    { label: 'Innenmasse', value: '2.36 m × 2.06 m × 2.10 m' },
    { label: 'Kapazität', value: '4 bis 5 Personen gleichzeitig' },
    { label: 'Eigengewicht', value: 'ca. 2\'450 kg (fertig montiert)' },
    { label: 'Glasaufbau', value: 'ESG/VSG 3-fach Isolierglas Ug 0.6 W/(m²K)' },
    { label: 'Wandaufbau', value: '140 mm mehrschichtig hinterlüftet mit Holzfaser' },
    { label: 'Elektroanschluss', value: '400V 3N~ 16A (9.0 – 12.0 kW)' },
    { label: 'Ofenoption', value: 'Elektrischer Turmofen oder Kaminholzofen' },
  ];

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-28 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-warmWhite/50 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-warmWhite">Home</Link>
          <span>/</span>
          <Link to="/kollektion" className="hover:text-warmWhite">Kollektion</Link>
          <span>/</span>
          <span className="text-bronze">NØRRA CUBE 01</span>
        </div>

        {/* Hero Section: Title + 3D Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
              Das Flaggschiff
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-warmWhite leading-tight font-normal">
              NØRRA<br />CUBE 01
            </h1>
            <p className="mt-6 text-base text-warmWhite/80 font-sans leading-relaxed">
              Die ultimative Synthese aus puristischer Schweizer Architektur und alpiner Saunatradition. Vollflächig verglast, monolithisch umhüllt von feinstem Thermoholz.
            </p>

            <div className="mt-8 pt-8 border-t border-warmWhite/15 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-warmWhite/40 uppercase block">
                  Richtpreis ab
                </span>
                <span className="font-mono text-3xl text-bronze font-bold">
                  {formatCHF(10490)}
                </span>
              </div>
              <span className="text-xs font-mono text-warmWhite/60">
                Inkl. Schweizer MwSt.
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/konfigurator"
                className="flex-1 py-4 bg-warmWhite text-charcoal text-center text-xs font-mono uppercase tracking-widest font-semibold hover:bg-bronze hover:text-white transition-all flex items-center justify-center gap-2 shadow-2xl"
              >
                <span>3D Konfigurieren</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setExploded(!exploded)}
                className="px-6 py-4 border border-warmWhite/20 text-xs font-mono uppercase tracking-widest hover:border-bronze transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-bronze" />
                <span>{exploded ? 'Zusammenfügen' : 'Explosionsansicht'}</span>
              </button>
            </div>
          </div>

          {/* Interactive 3D Canvas Box */}
          <div className="lg:col-span-7 h-[500px] sm:h-[600px] bg-graphite/40 border border-warmWhite/15 relative overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-charcoal/80 border border-warmWhite/20 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-warmWhite/80 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-bronze" />
              <span>360° Interaktiv</span>
            </div>

            <Canvas
              dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
              shadows
              gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
              camera={{ fov: 40, position: [3.2, 1.7, 4.0] }}
            >
              <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.06}
                minDistance={1.8}
                maxDistance={7.0}
                target={[0, 1.1, 0]}
              />
              <SceneEnvironment progress={0.1} />
              <SaunaAsset config={DEFAULT_CONFIG} explodedProgress={exploded ? 0.7 : 0} />
            </Canvas>
          </div>
        </div>

        {/* Architectural Features Grid */}
        <div className="mb-24">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-4">
            Konstruktionsmerkmale
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mb-12">
            Präzision bis ins letzte Detail
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="border border-warmWhite/15 p-6 bg-graphite/30">
                  <Icon className="w-6 h-6 text-bronze mb-4" />
                  <h3 className="font-serif text-xl text-warmWhite mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-sans text-warmWhite/75 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="border border-warmWhite/15 bg-graphite/20 p-8 sm:p-12 mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
            Technische Dokumentation
          </span>
          <h2 className="font-serif text-3xl text-warmWhite mb-8">
            Spezifikationen NØRRA CUBE 01
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-mono text-xs">
            {specs.map((item, idx) => (
              <div key={idx} className="flex justify-between py-3 border-b border-warmWhite/10">
                <span className="text-warmWhite/50">{item.label}</span>
                <span className="text-warmWhite font-medium text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="font-serif text-3xl sm:text-4xl text-warmWhite mb-4">
            Bereit für Ihren Rückzugsort?
          </h3>
          <p className="text-sm font-sans text-warmWhite/75 leading-relaxed mb-8">
            Passen Sie Holzarten, Bänke und Glas nach Ihren Vorstellungen im 3D-Konfigurator an oder laden Sie eine unverbindliche Richtpreis-Offerte herunter.
          </p>
          <Link
            to="/konfigurator"
            className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all shadow-2xl"
          >
            <span>Jetzt CUBE 01 konfigurieren</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
