import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const TheWayPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Selektion & Thermoveredelung',
      subtitle: 'Ausgangsmaterial ohne Chemie',
      desc: 'Wir wählen ausschliesslich nachhaltig geschlagenes Gebirgsfichten- und Kiefernholz. In einer sauerstofffreien Kammer wird das Holz bei über 210°C thermisch modifiziert. Die Zellstruktur verändert sich dauerhaft: Feuchtigkeit hat keine Angriffsfläche mehr, Fäulnis ist biologisch ausgeschlossen.',
    },
    {
      num: '02',
      title: 'CNC-Präzisionszuschnitt',
      subtitle: 'Zehntelmillimeter-Genauigkeit',
      desc: 'Jede Wandlamelle und jedes Rahmensegment wird auf modernen Schweizer Mehrachs-Fräszentren zugeschnitten. Dadurch greifen Nut- und Federverbindungen auch nach Jahren extremer Temperaturwechsel luft- und dampfdicht ineinander.',
    },
    {
      num: '03',
      title: 'Dreifach-Isolierverglasung',
      subtitle: 'Ug 0.6 W/(m²K) für alpine Winter',
      desc: 'Die rahmenlos scheinende Glasfassade besteht aus einem 3-fach Verbund-Sicherheitsglas (VSG) mit Edelgasfüllung. Wärme bleibt drinnen, Kälte draussen. Kondenswasser an der Scheibe wird konstruktiv verhindert.',
    },
    {
      num: '04',
      title: 'Bänke & Ergonomie',
      subtitle: 'Samtweiche Polarespe',
      desc: 'Die Bänke werden schwebend ohne sichtbare Schraubenverbindungen montiert. Das helle Espenholz besitzt eine sehr geringe Wärmeleitfähigkeit und bleibt auch bei 95°C angenehm temperiert zum Sitzen und Liegen.',
    },
    {
      num: '05',
      title: 'Elektrifizierung & Vorab-Prüfung',
      subtitle: 'Komplett werkseitig verkabelt',
      desc: 'Ofen, indirekte LED-Ambientebeleuchtung und digitale Steuerung werden im Werk vollständig montiert und einem mehrstündigen Heizzyklus unterzogen. Vor Auslieferung wird jedes Bauteil protokolliert.',
    },
    {
      num: '06',
      title: 'Alpiner Spezialtransport',
      subtitle: 'Auf jede Schweizer Passstrasse',
      desc: 'Ausgeliefert als fertiges Modul auf speziellem Tieflader mit Allrad-Antrieb. Bei extrem abgelegenen Terrassen oder Hanglagen koordinieren wir das präzise Einfliegen per Helikopter.',
    },
    {
      num: '07',
      title: 'Plug & Heat Inbetriebnahme',
      subtitle: 'Binnen Stunden betriebsbereit',
      desc: 'Nach dem Aufsetzen auf Punktfundamente oder eine befestigte Steinterrasse wird die Sauna an die bauseitige Zuleitung angeschlossen. Am selben Tag heizt Ihre NØRRA zum ersten Mal ein.',
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-3">
            Die Manufaktur-Reise
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-warmWhite font-normal leading-tight">
            Der Weg zur vollendeten Sauna.
          </h1>
          <p className="mt-6 text-base text-warmWhite/75 font-sans leading-relaxed">
            Vom alpinen Rohholz bis zum ersten wohligen Aufguss mit Blick auf die schneebedeckten Gipfel. Unser transparenter Weg der Qualität.
          </p>
        </div>

        {/* Steps Chronology */}
        <div className="space-y-16 border-l border-warmWhite/15 pl-6 sm:pl-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on timeline */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-charcoal border-2 border-bronze group-hover:bg-bronze transition-colors" />

              <span className="font-mono text-xs text-bronze tracking-widest uppercase block mb-1">
                Schritt {step.num} · {step.subtitle}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-warmWhite mb-3">
                {step.title}
              </h2>
              <p className="text-sm font-sans text-warmWhite/75 leading-relaxed max-w-2xl">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Next step CTA */}
        <div className="mt-24 pt-12 border-t border-warmWhite/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-warmWhite">
              Erleben Sie die Fertigung im 3D-Showroom
            </h3>
            <p className="text-xs font-mono text-warmWhite/60 mt-1">
              Betrachten Sie die Element-Montage in unserem interaktiven Modell.
            </p>
          </div>
          <Link
            to="/konfigurator"
            className="px-6 py-3.5 bg-warmWhite text-charcoal text-xs font-mono uppercase tracking-widest font-semibold hover:bg-bronze hover:text-white transition-all flex items-center gap-2"
          >
            <span>Jetzt Konfigurieren</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
