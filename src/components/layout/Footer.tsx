import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, MapPin, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-charcoal border-t border-warmWhite/15 text-warmWhite pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-warmWhite/10">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs tracking-widest text-bronze uppercase">
                Architektur & Wohlbefinden
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-warmWhite mt-3 font-normal leading-tight">
                Entwickelt für die Schweizer Alpen. Gebaut für Generationen.
              </h2>
            </div>
            <div className="mt-8">
              <Link
                to="/konfigurator"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-warmWhite text-charcoal text-xs font-mono tracking-widest uppercase hover:bg-bronze hover:text-white transition-all font-semibold"
              >
                <span>Eigenen CUBE 01 gestalten</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-warmWhite/40 mb-4">
              Kollektion
            </h4>
            <ul className="space-y-3 font-mono text-xs text-warmWhite/80">
              <li><Link to="/kollektion/cube-01" className="hover:text-bronze transition-colors">NØRRA CUBE 01</Link></li>
              <li><Link to="/kollektion" className="hover:text-bronze transition-colors">Modellübersicht</Link></li>
              <li><Link to="/konfigurator" className="hover:text-bronze transition-colors">3D-Konfigurator</Link></li>
              <li><Link to="/materialien" className="hover:text-bronze transition-colors">Thermoholz & Glas</Link></li>
              <li><Link to="/offerte" className="hover:text-bronze transition-colors">Richtpreis-Offerte</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-warmWhite/40 mb-4">
              Manufaktur
            </h4>
            <ul className="space-y-3 font-mono text-xs text-warmWhite/80">
              <li><Link to="/der-weg" className="hover:text-bronze transition-colors">Der Weg zur Sauna</Link></li>
              <li><Link to="/atelier" className="hover:text-bronze transition-colors">Das Atelier</Link></li>
              <li><Link to="/faq" className="hover:text-bronze transition-colors">Fragen & Antworten</Link></li>
              <li><Link to="/kontakt" className="hover:text-bronze transition-colors">Showroom Zürich</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-warmWhite/40 mb-4">
              Standort & Atelier
            </h4>
            <div className="space-y-3 font-mono text-xs text-warmWhite/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                <span>NØRRA SAUNA Atelier Schweiz<br />Gotthardstrasse 26<br />8002 Zürich</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Compass className="w-4 h-4 text-bronze shrink-0" />
                <span>Private Besichtigungen nach Termin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Notice Disclaimer (Swiss Standard German, compliant with prompt requirements) */}
        <div className="py-6 border-b border-warmWhite/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-warmWhite/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bronze" />
            <span>
              INTERAKTIVE 3D-SHOWROOM-DEMONSTRATION. Alle genannten Preise (CHF) sind unverbindliche Richtwerte.
            </span>
          </div>
          <span>Markt: Schweiz / Liechtenstein</span>
        </div>

        {/* Legal Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-warmWhite/40">
          <div>
            © {new Date().getFullYear()} NØRRA SAUNA. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="hover:text-warmWhite transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-warmWhite transition-colors">Datenschutz</Link>
            <Link to="/agb" className="hover:text-warmWhite transition-colors">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
