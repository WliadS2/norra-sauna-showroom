import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { PersistentSceneCanvas } from '@/components/experience/PersistentSceneCanvas';
import { ScrollTimeline } from '@/components/experience/ScrollTimeline';
import { InteractionController } from '@/components/experience/InteractionController';
import {
  SaunaConfig,
  DEFAULT_CONFIG,
  EXTERIOR_OPTIONS,
  GLAZING_OPTIONS,
  formatCHF,
  calculateConfigPrice,
} from '@/types/configurator';

export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(1);
  const [manualControl, setManualControl] = useState(false);
  const [manualExploded, setManualExploded] = useState(false);
  const [manualPreset, setManualPreset] = useState<'front' | 'corner' | 'interior' | 'macro' | null>(null);

  // Live configuration state reflected in 3D
  const [config, setConfig] = useState<SaunaConfig>(DEFAULT_CONFIG);

  // GSAP ScrollTrigger updates progress deterministically
  const handleProgress = useCallback((newProgress: number, newStage: number) => {
    setProgress(newProgress);
    setStageIndex(newStage);
  }, []);

  const handleToggleManual = () => {
    setManualControl((prev) => !prev);
  };

  const handleToggleExploded = () => {
    setManualExploded((prev) => !prev);
  };

  const handleReset = () => {
    setManualControl(false);
    setManualExploded(false);
    setManualPreset(null);
  };

  const handleSelectPreset = (preset: 'front' | 'corner' | 'interior' | 'macro') => {
    setManualPreset(preset);
  };

  return (
    <div ref={containerRef} className="relative bg-charcoal text-warmWhite min-h-screen selection:bg-bronze selection:text-white">
      {/* ========================================================================= */}
      {/* 1. THE SINGLE PERSISTENT THREE.JS CANVAS (Persists throughout the homepage) */}
      {/* ========================================================================= */}
      <PersistentSceneCanvas
        progress={progress}
        config={config}
        manualControl={manualControl}
        manualPreset={manualPreset}
        manualExploded={manualExploded}
      />

      {/* GSAP ScrollTrigger synchronizer */}
      <ScrollTimeline
        containerRef={containerRef}
        onProgress={handleProgress}
      />

      {/* Floating 360 / Exploded / Stage Controller */}
      <InteractionController
        progress={progress}
        stageIndex={stageIndex}
        manualControl={manualControl}
        manualExploded={manualExploded}
        onToggleManual={handleToggleManual}
        onToggleExploded={handleToggleExploded}
        onReset={handleReset}
        onSelectPreset={handleSelectPreset}
      />

      {/* ========================================================================= */}
      {/* 2. THE CONTINUOUS NARRATIVE SCROLL OVERLAY (12 Distinct Cinematic Stages)  */}
      {/* ========================================================================= */}
      <div className="relative z-10 pointer-events-none">

        {/* ------------------------------------------------------------- */}
        {/* ACT 1 — THE ALPINE REVEAL                                     */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-1"
          data-testid="stage-1-hero"
          className="min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 pt-28 pointer-events-none"
        >
          <div className="max-w-xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal/80 border border-warmWhite/20 backdrop-blur-md text-[11px] font-mono tracking-widest text-bronze uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
              <span>Schweizer Saunamanufaktur</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-warmWhite leading-[0.95] tracking-tight font-normal text-balance">
              WÄRME.<br />
              <span className="italic font-light">NEU GEDACHT.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-warmWhite/80 max-w-md font-sans leading-relaxed">
              Architektonische Saunas für aussergewöhnliche Rückzugsorte. Entwickelt für die raue Schönheit der Schweizer Alpen.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/konfigurator"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-warmWhite text-charcoal text-xs font-mono tracking-widest uppercase hover:bg-bronze hover:text-white transition-all font-semibold shadow-2xl"
              >
                <span>CUBE 01 Konfigurieren</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="#stage-2"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-charcoal/80 border border-warmWhite/20 backdrop-blur-md text-xs font-mono tracking-widest uppercase hover:border-bronze transition-colors text-warmWhite"
              >
                <span>Erkunden</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Model Flagship Tag Bottom Left */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto pt-12">
            <div className="bg-charcoal/80 border border-warmWhite/15 backdrop-blur-md p-4 sm:p-5 max-w-xs">
              <div className="text-[10px] font-mono tracking-widest text-bronze uppercase">
                Flaggschiff
              </div>
              <div className="font-serif text-2xl text-warmWhite mt-1">
                NØRRA CUBE 01
              </div>
              <div className="text-xs font-mono text-warmWhite/60 mt-1">
                Schwarz Thermoholz · Panorama Front
              </div>
            </div>

            <div className="text-right hidden sm:block font-mono text-xs text-warmWhite/50">
              <div>STANDORT: SCHWEIZER ALPEN</div>
              <div>HÖHE: 1'850 M.Ü.M.</div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 2 — CAMERA EXPLORATION                                    */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-2"
          className="min-h-screen flex items-center justify-end p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              02 / Perspektive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Transparenz & Panoramasicht
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Die rahmenlos integrierte 3-fach Isolierverglasung öffnet den Innenraum vollständig für die alpine Kulisse. Das Innenklima bleibt selbst bei minus 25 Grad Aussentemperatur vollkommen stabil.
            </p>
            <div className="mt-6 pt-6 border-t border-warmWhite/10 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-warmWhite/40 block">WÄRMEDURCHGANG</span>
                <span className="text-warmWhite font-semibold">Ug 0.6 W/(m²K)</span>
              </div>
              <div>
                <span className="text-warmWhite/40 block">SICHERHEITSGLAS</span>
                <span className="text-warmWhite font-semibold">ESG / VSG 3-fach</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 3 — MATERIAL CLOSE-UP                                     */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-3"
          className="min-h-screen flex items-center justify-start p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              03 / Haptik & Natur
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Karbonisiertes Thermoholz
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Unter Ausschluss von Sauerstoff bei über 210 Grad Celsius thermisch veredelt. Das Holz verliert jede Feuchtigkeitsaufnahme, quillt nicht, schwindet nicht und widersteht Schnee, UV-Strahlung und Eis dauerhaft ohne chemische Imprägnierung.
            </p>
            <div className="mt-6 pt-6 border-t border-warmWhite/10 space-y-2 font-mono text-xs text-warmWhite/70">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze" />
                <span>100% Chemiefreie Veredelung</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze" />
                <span>Dauerhaftigkeitsklasse 1–2 (DIN EN 350-2)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze" />
                <span>Samtige Oberfläche mit natürlichem Röstduft</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 4 — FACTORY ASSEMBLY                                      */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-4"
          className="min-h-screen flex items-center justify-end p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              04 / Schweizer Manufaktur
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Element für Element
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Jedes NØRRA Saunasegment wird im Trockenbauverfahren auf den Zehntelmillimeter millimetergenau vorgefertigt. Massiver Stahlrahmen, hochgedämmte Wandpaneele und fugenlos eingepasste Espenbänke verschmelzen zu einer monolithischen Einheit.
            </p>
            <div className="mt-6 pt-6 border-t border-warmWhite/10 font-mono text-xs text-warmWhite/60">
              <div className="flex justify-between py-1">
                <span>CHASSIS</span>
                <span className="text-warmWhite">Feuerverzinkter Stahlrahmen</span>
              </div>
              <div className="flex justify-between py-1">
                <span>DÄMMUNG</span>
                <span className="text-warmWhite">Ökologische Holzfaserdämmung 120mm</span>
              </div>
              <div className="flex justify-between py-1">
                <span>INTERIEUR</span>
                <span className="text-warmWhite">Astfreie skandinavische Espe</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 5 — DARK PRODUCT STUDIO                                   */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-5"
          className="min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-lg bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              05 / Studio-Inspektion
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              360° Studio-Kontrolle
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Aktivieren Sie den 360°-Modus über die Leiste am unteren Bildschirmrand, um den CUBE 01 frei mit der Maus oder dem Touchscreen zu drehen, heranzuzoomen und die Komponenten zu explodieren.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleToggleManual}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  manualControl
                    ? 'bg-bronze text-white border-bronze'
                    : 'bg-warmWhite text-charcoal border-warmWhite hover:bg-bronze hover:text-white'
                }`}
              >
                {manualControl ? '360° Modus Beenden' : '360° Interaktiv Steuern'}
              </button>
              <button
                onClick={handleToggleExploded}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-warmWhite/30 text-warmWhite hover:border-bronze hover:text-bronze transition-colors"
              >
                {manualExploded ? 'Zusammenfügen' : 'Explosionszeichnung'}
              </button>
            </div>
          </div>
          <div className="text-center text-xs font-mono text-warmWhite/40 pointer-events-auto">
            Scrollen Sie weiter für Transport & Lieferung
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 6 — SHIPPING PREPARATION                                  */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-6"
          className="min-h-screen flex items-center justify-start p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              06 / Schutz & Veredelung
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Vorbereitung zum Transport
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Jeder CUBE 01 wird in der Manufaktur vollständig endkontrolliert, werkseitig vorverkabelt und mit massgeschneiderten Schweizer Kantenschutzprofilen witterungsfest für die Reise versiegelt.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 7 — FREIGHT JOURNEY                                       */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-7"
          className="min-h-screen flex items-center justify-end p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              07 / Transit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Über die Schweizer Pässe
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Ob Engadin, Berner Oberland, Zermatt oder Zentralschweiz: Unsere spezialisierten Schweizer Logistikpartner transportieren den Kubus per Spezial-LKW oder Helikopter direkt an den Bestimmungsort.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 8 — SWISS VILLA ARRIVAL                                   */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-8"
          className="min-h-screen flex items-center justify-start p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              08 / Ankunft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Im Licht des Spätnachmittags
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Sanftes, goldenes Alpenlicht spiegelt sich auf der Glasfassade. Die Sauna bettet sich natürlich in die alpine Terrassenarchitektur ein — als ob sie schon immer dort gestanden hätte.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 9 — ARCHITECTURAL INSTALLATION                            */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-9"
          className="min-h-screen flex items-center justify-end p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-md bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              09 / Installation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Plug & Heat Konzept
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Dank vollintegrierter Haustechnik und verdeckter Anschlüsse ist der CUBE 01 innerhalb weniger Stunden nach Platzierung betriebsbereit. Ein Starkstromanschluss (400V) oder der optionale Holzofen genügen.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 10 — INTERACTIVE CONFIGURATION PREVIEW                     */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-10"
          className="min-h-screen flex items-center justify-start p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-lg bg-charcoal/90 border border-warmWhite/20 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              10 / Live Konfiguration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-4">
              Material & Verglasung wählen
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed mb-6">
              Testen Sie die Hölzer direkt am 3D-Modell in dieser Szene:
            </p>

            {/* Live Exterior Selector */}
            <div className="space-y-3 mb-6">
              <span className="font-mono text-xs text-warmWhite/60 uppercase block">Aussenfassade</span>
              <div className="grid grid-cols-3 gap-2">
                {EXTERIOR_OPTIONS.map((ext) => (
                  <button
                    key={ext.id}
                    onClick={() => setConfig({ ...config, exterior: ext.id })}
                    className={`p-2.5 text-left border transition-all text-xs font-mono flex flex-col justify-between ${
                      config.exterior === ext.id
                        ? 'border-bronze bg-graphite'
                        : 'border-warmWhite/15 hover:border-warmWhite/40 bg-charcoal'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full mb-2 border border-warmWhite/20"
                      style={{ backgroundColor: ext.colorHex }}
                    />
                    <span className="font-medium text-warmWhite truncate block">{ext.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Glazing Selector */}
            <div className="space-y-3 mb-6">
              <span className="font-mono text-xs text-warmWhite/60 uppercase block">Verglasung</span>
              <div className="grid grid-cols-2 gap-2">
                {GLAZING_OPTIONS.slice(0, 2).map((glz) => (
                  <button
                    key={glz.id}
                    onClick={() => setConfig({ ...config, glazing: glz.id })}
                    className={`p-2.5 text-left border transition-all text-xs font-mono ${
                      config.glazing === glz.id
                        ? 'border-bronze bg-graphite'
                        : 'border-warmWhite/15 hover:border-warmWhite/40 bg-charcoal'
                    }`}
                  >
                    <span className="font-medium text-warmWhite block">{glz.name}</span>
                    <span className="text-[10px] text-warmWhite/50 block mt-1">{glz.tagline}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-warmWhite/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-warmWhite/40 uppercase block">Aktueller Richtpreis</span>
                <span className="font-mono text-lg text-bronze font-bold">
                  {formatCHF(calculateConfigPrice(config))}
                </span>
              </div>
              <Link
                to="/konfigurator"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-warmWhite text-charcoal text-xs font-mono uppercase tracking-widest hover:bg-bronze hover:text-white transition-all font-semibold"
              >
                <span>Vollständiger Konfigurator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 11 — ENGINEERING & TECHNICAL SPECIFICATIONS               */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-11"
          className="min-h-screen flex items-center justify-end p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-lg bg-charcoal/90 border border-warmWhite/20 backdrop-blur-xl p-8 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              11 / Technische Daten
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-2 mb-6">
              Engineering für Extreme
            </h2>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs border-b border-warmWhite/10 pb-6 mb-6">
              <div className="p-3 bg-graphite/60 border border-warmWhite/10">
                <span className="text-warmWhite/40 block">SCHNEELAST</span>
                <span className="text-warmWhite text-sm font-semibold mt-1 block">bis 350 kg/m²</span>
              </div>
              <div className="p-3 bg-graphite/60 border border-warmWhite/10">
                <span className="text-warmWhite/40 block">DÄMMWERT WAND</span>
                <span className="text-warmWhite text-sm font-semibold mt-1 block">U = 0.22 W/(m²K)</span>
              </div>
              <div className="p-3 bg-graphite/60 border border-warmWhite/10">
                <span className="text-warmWhite/40 block">HEIZLEISTUNG</span>
                <span className="text-warmWhite text-sm font-semibold mt-1 block">9.0 – 12.0 kW</span>
              </div>
              <div className="p-3 bg-graphite/60 border border-warmWhite/10">
                <span className="text-warmWhite/40 block">AUFHEIZZEIT</span>
                <span className="text-warmWhite text-sm font-semibold mt-1 block">ca. 45 min auf 85°C</span>
              </div>
            </div>

            <p className="text-xs font-sans text-warmWhite/60 leading-relaxed">
              Zugelassen und erprobt für alpine Höhenlagen bis 2'500 Meter über Meer. Vollständig witterungsautonom.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* ACT 12 — THE FINALE & BRAND STATEMENT                         */}
        {/* ------------------------------------------------------------- */}
        <section
          id="stage-12"
          className="min-h-screen flex flex-col justify-center items-center text-center p-6 sm:p-12 lg:p-16 pointer-events-none"
        >
          <div className="max-w-3xl bg-charcoal/85 border border-warmWhite/15 backdrop-blur-xl p-10 sm:p-16 pointer-events-auto shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-bronze uppercase">
              NØRRA SAUNA SCHWEIZ
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-warmWhite mt-4 mb-6 leading-tight font-normal text-balance">
              DEIN RÜCKZUGSORT.<br />
              <span className="italic font-light">NEU DEFINIERT.</span>
            </h2>

            <p className="text-base sm:text-lg font-sans text-warmWhite/80 max-w-xl mx-auto leading-relaxed mb-10">
              Beginnen Sie Ihre persönliche Konfiguration oder vereinbaren Sie eine private Besichtigung in unserem Atelier in Zürich.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/konfigurator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-bronze text-white text-xs font-mono tracking-widest uppercase hover:bg-warmWhite hover:text-charcoal transition-all font-semibold shadow-2xl"
              >
                <span>Jetzt konfigurieren</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/offerte"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-charcoal border border-warmWhite/20 text-xs font-mono tracking-widest uppercase hover:border-bronze transition-colors text-warmWhite"
              >
                <span>Richtpreis Anfragen</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
