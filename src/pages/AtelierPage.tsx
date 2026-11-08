import React from 'react';
import { Link } from 'react-router-dom';

export const AtelierPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-3">
            Über NØRRA
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-warmWhite font-normal leading-tight">
            Das Atelier für alpine Saunakultur.
          </h1>
          <p className="mt-6 text-base text-warmWhite/75 font-sans leading-relaxed">
            Entstanden aus der Überzeugung, dass eine Sauna kein versteckter Kellerraum sein darf, sondern das architektonische Herzstück eines modernen alpinen Rückzugsortes.
          </p>
        </div>

        {/* Narrative Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="border border-warmWhite/15 p-8 bg-graphite/30">
            <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-2">
              Philosophie
            </span>
            <h2 className="font-serif text-2xl text-warmWhite mb-4">
              Reduktion auf das Elementare
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Wir verzichten auf modische Schnörkel und kurzlebige Trends. Ein Kubus von NØRRA spricht durch seine Proportionen, das Spiel von Licht auf dem karbonisierten Holz und die Weite des Horizonts.
            </p>
          </div>

          <div className="border border-warmWhite/15 p-8 bg-graphite/30">
            <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-2">
              Konstruktion
            </span>
            <h2 className="font-serif text-2xl text-warmWhite mb-4">
              Schweizer Ingenieurskunst
            </h2>
            <p className="text-sm font-sans text-warmWhite/75 leading-relaxed">
              Jedes Detail wird für jahrzehntelange Dauerhaftigkeit unter alpinen Extrembedingungen konstruiert: Massiver Stahlunterbau, feuchtigkeitsimmune Dämmung und schwere 3-fach Verglasung.
            </p>
          </div>
        </div>

        {/* Atelier Space Info */}
        <div className="border border-warmWhite/20 p-8 sm:p-12 bg-charcoal mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
                Besuch im Atelier Zürich
              </span>
              <h3 className="font-serif text-3xl text-warmWhite mb-3">
                Materialien berühren. Raum erleben.
              </h3>
              <p className="text-sm font-sans text-warmWhite/75 max-w-xl leading-relaxed">
                In unserem Atelier an der Gotthardstrasse in Zürich präsentieren wir Originalmuster aller Holzarten, Glasstärken und Bänke. Wir nehmen uns gerne Zeit für eine individuelle Projektberatung.
              </p>
            </div>
            <Link
              to="/kontakt"
              className="px-6 py-3.5 bg-warmWhite text-charcoal text-xs font-mono uppercase tracking-widest font-semibold hover:bg-bronze hover:text-white transition-all shrink-0"
            >
              Termin vereinbaren
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
