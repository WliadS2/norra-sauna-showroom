import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass } from 'lucide-react';
import { formatCHF } from '@/types/configurator';

export const CollectionPage: React.FC = () => {
  const models = [
    {
      id: 'cube-01',
      title: 'NØRRA CUBE 01',
      category: 'Flaggschiff · Outdoor Panorama',
      description: 'Architektonische Outdoor-Sauna mit vollflächiger 3-fach Isolierglasfassade und karbonisiertem Thermoholz.',
      basePrice: 10490,
      specs: ['4–5 Personen', '2.60 × 2.30 m', 'Panorama Front', '9.0 kW Elektro oder Holz'],
      isFlagship: true,
      path: '/kollektion/cube-01',
    },
    {
      id: 'cube-01-compact',
      title: 'NØRRA CUBE 01 COMPACT',
      category: 'Urban & Terrassen',
      description: 'Kompakte Luxussauna für urbane Dachterrassen und private Gärten ohne Platzkompromisse.',
      basePrice: 7990,
      specs: ['2–3 Personen', '2.20 × 2.00 m', 'Rahmenlos Glas', '6.0–8.0 kW Elektro'],
      isFlagship: false,
      path: '/konfigurator',
    },
    {
      id: 'cube-01-grand',
      title: 'NØRRA CUBE 01 GRAND',
      category: 'Alpine Residenz',
      description: 'Grosszügiger Saunapavillon mit vorgelagertem geschütztem Vorraum und 270°-Eckverglasung.',
      basePrice: 14990,
      specs: ['6–8 Personen', '3.20 × 2.60 m', 'Eck-Panorama', '12.0 kW Elektro / Holzofen'],
      isFlagship: false,
      path: '/konfigurator',
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-3">
            Die NØRRA Kollektion
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-warmWhite font-normal leading-tight">
            Architektonische Saunas für die Schweiz.
          </h1>
          <p className="mt-6 text-base text-warmWhite/75 font-sans leading-relaxed">
            Jedes Modell basiert auf unserem kompromisslosen Monolith-Prinzip: Reinstes Thermoholz, hochisolierendes Schweizer Architekturglas und zeitlose alpine Eleganz.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col justify-between border p-8 transition-all duration-300 relative ${
                m.isFlagship
                  ? 'border-bronze bg-graphite/40 shadow-2xl'
                  : 'border-warmWhite/15 bg-charcoal hover:border-warmWhite/40'
              }`}
            >
              {m.isFlagship && (
                <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-bronze uppercase bg-bronze/10 border border-bronze/30 px-2.5 py-1">
                  Flaggschiff 3D
                </div>
              )}

              <div>
                <span className="font-mono text-xs text-warmWhite/50 uppercase block mb-2">
                  {m.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-warmWhite mb-4">
                  {m.title}
                </h3>
                <p className="text-sm font-sans text-warmWhite/75 leading-relaxed mb-6">
                  {m.description}
                </p>

                {/* Specs List */}
                <div className="space-y-2 border-t border-warmWhite/10 pt-6 mb-8 font-mono text-xs text-warmWhite/80">
                  {m.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-bronze" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="border-t border-warmWhite/10 pt-4 mb-6">
                  <span className="text-[10px] font-mono uppercase text-warmWhite/50 block">
                    Richtpreis ab
                  </span>
                  <span className="font-mono text-xl text-bronze font-bold">
                    {formatCHF(m.basePrice)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={m.path}
                    className="flex-1 py-3 text-center bg-warmWhite text-charcoal text-xs font-mono uppercase tracking-widest font-semibold hover:bg-bronze hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>{m.isFlagship ? 'Im Detail ansehen' : 'Konfigurieren'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/konfigurator"
                    className="p-3 border border-warmWhite/20 hover:border-bronze text-warmWhite transition-colors"
                    title="In 3D öffnen"
                  >
                    <Compass className="w-4 h-4 text-bronze" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Custom Bespoke Section */}
        <div className="mt-20 border border-warmWhite/15 p-8 sm:p-12 bg-graphite/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
              Sonderanfertigungen
            </span>
            <h3 className="font-serif text-3xl text-warmWhite mb-3">
              Architektur nach Mass für Ihr Anwesen
            </h3>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Sie planen eine spezifische Integration in eine Felswand, ein historisches Engadinerhaus oder einen Terrassenvorsprung? Unser Atelier plant massgeschneiderte Einzelstücke in direkter Abstimmung mit Ihrem Architekten.
            </p>
          </div>
          <Link
            to="/kontakt"
            className="px-8 py-4 bg-charcoal border border-warmWhite/25 text-warmWhite text-xs font-mono uppercase tracking-widest hover:border-bronze hover:text-bronze transition-all shrink-0"
          >
            Atelier-Gespräch Anfragen
          </Link>
        </div>
      </div>
    </div>
  );
};
