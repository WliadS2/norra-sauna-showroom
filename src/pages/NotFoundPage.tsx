import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal text-warmWhite flex items-center justify-center p-6 text-center">
      <div className="max-w-md border border-warmWhite/20 bg-graphite/40 backdrop-blur-xl p-10 shadow-2xl">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-4">
          Status 404 · Unauffindbar
        </span>
        <h1 className="font-serif text-5xl text-warmWhite mb-4">
          Im Nebel verschollen.
        </h1>
        <p className="text-sm font-sans text-warmWhite/75 leading-relaxed mb-8">
          Die angeforderte Seite existiert nicht oder wurde in einen anderen Bereich des Ateliers verlegt.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 py-3.5 bg-bronze text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zur Startseite</span>
          </Link>
          <Link
            to="/konfigurator"
            className="flex-1 py-3.5 bg-graphite border border-warmWhite/20 text-warmWhite text-xs font-mono uppercase tracking-widest hover:border-bronze transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-bronze" />
            <span>3D Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
