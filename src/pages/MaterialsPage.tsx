import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';

export const MaterialsPage: React.FC = () => {
  const materials = [
    {
      id: 'black-thermowood',
      name: 'Karbonisiertes Thermoholz',
      origin: 'Schweizer & Skandinavische Bergwälder',
      treatment: '215°C Vakuum-Pyrolyse ohne chemische Zusätze',
      color: '#181716',
      highlights: [
        'Dauerhaftigkeitsklasse 1 nach DIN EN 350-2',
        'Quell- und Schwindverhalten um 80% reduziert',
        'Tiefschwarze seidenmatte Patina mit natürlichem Schutz',
      ],
      description: 'Durch das gezielte Erhitzen unter Ausschluss von Sauerstoff werden Hemicellulosen abgebaut. Pilze und Insekten finden keinen Nährboden mehr. Das Holz ist resistent gegen Nässe, Frost und UV-Licht.',
    },
    {
      id: 'polar-aspen',
      name: 'Astfreie Polarespe',
      origin: 'Nordische Forstwirtschaft (PEFC-zertifiziert)',
      treatment: 'Schonende Kammertrocknung & samtiger Feinschliff',
      color: '#DFD5C4',
      highlights: [
        'Extrem geringe Wärmeleitfähigkeit (bleibt kühl)',
        'Vollkommen harzfrei und splitterfest',
        'Helle, beruhigende Lichtreflexion im Innenraum',
      ],
      description: 'Das bevorzugte Holz für Saunabänke. Es nimmt kaum Wärme auf, sodass Sie sich auch bei hohen Temperaturen von 90°C entspannt zurücklehnen können.',
    },
    {
      id: 'cedar',
      name: 'Westkanadische Rotzeder',
      origin: 'Pazifischer Nordwesten',
      treatment: 'Naturbelassen, formstabil geölt',
      color: '#9E6A4B',
      highlights: [
        'Ätherische Öle mit beruhigendem Naturduft',
        'Warme Farbtöne von Honig bis Bernstein',
        'Natürlicher Schutz vor Feuchtigkeit und Schimmel',
      ],
      description: 'Zeder ist berühmt für ihr unverwechselbares Aroma, das bei jedem Aufguss dezent freigesetzt wird und die Atemwege beruhigt.',
    },
    {
      id: 'architectural-glass',
      name: '3-fach Isolierglas Ug 0.6',
      origin: 'Schweizer Glasveredelung',
      treatment: 'VSG-Sicherheitsglas mit Edelgas-Argonfüllung',
      color: '#384852',
      highlights: [
        'Passivhaus-Standard Dämmwert Ug 0.6 W/(m²K)',
        'Verbund-Sicherheitsglas gegen Bruch und Verletzung',
        'Kondensat- und beschlagfreie Aussensicht',
      ],
      description: 'Konzipiert für extreme Temperaturdifferenzen von bis zu 110 Kelvin zwischen Innenraum (+90°C) und Aussentemperatur (-20°C).',
    },
  ];

  const [activeMaterial, setActiveMaterial] = useState(materials[0]);

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-3">
            Materialphilosophie
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-warmWhite font-normal leading-tight">
            Ehrliche Materialien. Vollendete Haptik.
          </h1>
          <p className="mt-6 text-base text-warmWhite/75 font-sans leading-relaxed">
            Wir verwenden keine künstlichen Verbundstoffe oder toxische Lacke. In einer NØRRA Sauna atmen Sie nur reines Holz, heissen Stein und klare Bergluft.
          </p>
        </div>

        {/* Interactive Material Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Swatches List */}
          <div className="lg:col-span-4 space-y-3">
            {materials.map((mat) => {
              const isSelected = activeMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  className={`w-full p-4 text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-bronze bg-graphite'
                      : 'border-warmWhite/15 hover:border-warmWhite/30 bg-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border border-warmWhite/30 shadow-inner"
                      style={{ backgroundColor: mat.color }}
                    />
                    <div>
                      <span className="font-serif text-lg text-warmWhite block">
                        {mat.name}
                      </span>
                      <span className="text-[10px] font-mono text-warmWhite/50 block">
                        {mat.origin}
                      </span>
                    </div>
                  </div>
                  {isSelected && <span className="font-mono text-xs text-bronze">Aktiv</span>}
                </button>
              );
            })}
          </div>

          {/* Active Material Detail Card */}
          <div className="lg:col-span-8 border border-warmWhite/20 bg-graphite/40 p-8 sm:p-12">
            <div className="flex items-center justify-between border-b border-warmWhite/15 pb-4 mb-6">
              <div>
                <span className="font-mono text-xs text-bronze uppercase tracking-widest">
                  Materialstudie
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-1">
                  {activeMaterial.name}
                </h2>
              </div>
              <div
                className="w-12 h-12 rounded-full border-2 border-bronze shadow-lg"
                style={{ backgroundColor: activeMaterial.color }}
              />
            </div>

            <p className="text-sm font-sans text-warmWhite/80 leading-relaxed mb-8">
              {activeMaterial.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs border-y border-warmWhite/10 py-6 mb-8">
              <div>
                <span className="text-warmWhite/40 block mb-1">HERKUNFT</span>
                <span className="text-warmWhite font-semibold">{activeMaterial.origin}</span>
              </div>
              <div>
                <span className="text-warmWhite/40 block mb-1">BEHANDLUNG</span>
                <span className="text-warmWhite font-semibold">{activeMaterial.treatment}</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-warmWhite/90 mb-8">
              {activeMaterial.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-bronze shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/konfigurator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all"
            >
              <span>Im 3D-Konfigurator anwenden</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
