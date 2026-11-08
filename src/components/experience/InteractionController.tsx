import React from 'react';
import { Layers, RotateCcw, Compass } from 'lucide-react';
import { STAGE_TITLES } from './ScrollTimeline';

interface InteractionControllerProps {
  progress: number;
  stageIndex: number;
  manualControl: boolean;
  manualExploded: boolean;
  onToggleManual: () => void;
  onToggleExploded: () => void;
  onReset: () => void;
  onSelectPreset?: (preset: 'front' | 'corner' | 'interior' | 'macro') => void;
}

export const InteractionController: React.FC<InteractionControllerProps> = ({
  progress: _progress,
  stageIndex,
  manualControl,
  manualExploded,
  onToggleManual,
  onToggleExploded,
  onReset,
  onSelectPreset,
}) => {
  const currentStage = STAGE_TITLES[stageIndex - 1] || STAGE_TITLES[0];
  const isStudioStage = stageIndex === 5 || stageIndex === 10 || stageIndex === 11;

  return (
    <div className="fixed bottom-8 left-0 right-0 z-30 pointer-events-none flex flex-col items-center px-4">
      {/* Chapter Indicator Bar */}
      <div className="flex items-center gap-3 bg-charcoal/80 border border-warmWhite/15 backdrop-blur-md px-4 py-2 rounded-none mb-3 text-xs tracking-widest uppercase font-mono text-warmWhite/80 pointer-events-auto shadow-2xl">
        <span className="text-bronze font-bold">
          {String(stageIndex).padStart(2, '0')} / 12
        </span>
        <span className="text-warmWhite/30">|</span>
        <span className="truncate max-w-[200px] sm:max-w-none text-warmWhite font-medium">
          {currentStage.title}
        </span>
        <span className="hidden sm:inline text-warmWhite/40">
          — {currentStage.subtitle}
        </span>
      </div>

      {/* Interactive Controls (highlighted during Studio, Config preview, or when manually activated) */}
      <div
        className={`transition-all duration-500 flex flex-wrap items-center justify-center gap-2 bg-charcoal/90 border border-warmWhite/20 backdrop-blur-lg px-3 py-2 shadow-2xl pointer-events-auto ${
          isStudioStage || manualControl ? 'opacity-100 translate-y-0' : 'opacity-85 translate-y-1'
        }`}
      >
        {/* Toggle 360 Orbit Mode */}
        <button
          onClick={onToggleManual}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider transition-colors border ${
            manualControl
              ? 'bg-bronze text-white border-bronze'
              : 'bg-graphite text-warmWhite border-warmWhite/15 hover:border-bronze'
          }`}
          title="360° Freie Drehung mit Maus/Touch"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{manualControl ? '360° Modus Aktiv' : '360° Orbit Freischalten'}</span>
        </button>

        {/* Toggle Exploded View */}
        <button
          onClick={onToggleExploded}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider transition-colors border ${
            manualExploded
              ? 'bg-bronze text-white border-bronze'
              : 'bg-graphite text-warmWhite border-warmWhite/15 hover:border-bronze'
          }`}
          title="Komponenten-Explosionszeichnung"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{manualExploded ? 'Zusammenfügen' : 'Explodieren'}</span>
        </button>

        {/* Camera Quick Presets */}
        {manualControl && onSelectPreset && (
          <div className="hidden md:flex items-center gap-1 border-l border-warmWhite/15 pl-2">
            <button
              onClick={() => onSelectPreset('front')}
              className="px-2 py-1 text-[11px] font-mono text-warmWhite/70 hover:text-white hover:bg-graphite"
            >
              Front
            </button>
            <button
              onClick={() => onSelectPreset('corner')}
              className="px-2 py-1 text-[11px] font-mono text-warmWhite/70 hover:text-white hover:bg-graphite"
            >
              Ecke
            </button>
            <button
              onClick={() => onSelectPreset('interior')}
              className="px-2 py-1 text-[11px] font-mono text-warmWhite/70 hover:text-white hover:bg-graphite"
            >
              Interieur
            </button>
            <button
              onClick={() => onSelectPreset('macro')}
              className="px-2 py-1 text-[11px] font-mono text-warmWhite/70 hover:text-white hover:bg-graphite"
            >
              Detail
            </button>
          </div>
        )}

        {/* Reset View */}
        {manualControl && (
          <button
            onClick={onReset}
            className="p-1.5 text-warmWhite/60 hover:text-white hover:bg-graphite border border-warmWhite/15"
            title="Kamera Zurücksetzen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
