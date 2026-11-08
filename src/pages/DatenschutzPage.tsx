import React from 'react';
import { Link } from 'react-router-dom';

export const DatenschutzPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
          Schweizer Datenschutzgesetz (DSG)
        </span>
        <h1 className="font-serif text-4xl text-warmWhite mb-8">
          Datenschutzerklärung
        </h1>

        <div className="space-y-6 font-mono text-xs text-warmWhite/80 leading-relaxed border-t border-warmWhite/15 pt-8">
          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">1. Grundsatz</h3>
            <p>
              Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen strikt ein.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">2. Erfassung und Bearbeitung von Personendaten</h3>
            <p>
              In dieser Frontend-Showroom-Demonstration werden keinerlei personenbezogene Daten an externe Server oder Tracking-Dienste übertragen. Konfigurationsstände werden ausschliesslich lokal im Speicher Ihres Browsers (localStorage) abgelegt.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">3. Cookies & Lokale Speicherung</h3>
            <p>
              Diese Website verwendet keine Drittanbieter-Tracking-Cookies. Es werden lediglich technisch notwendige Session-Daten zur Aufrechterhaltung des 3D-Konfigurationszustands im lokalen Speicher des Browsers verwendet.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">4. Kontaktanfragen</h3>
            <p>
              Über das Kontaktformular eingegebene Daten verbleiben im Rahmen dieser Demonstration lokal im Browser und werden nicht an Dritte weitergegeben.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">5. Verantwortliche Stelle</h3>
            <p>
              NØRRA SAUNA Atelier Schweiz<br />
              Gotthardstrasse 26, 8002 Zürich<br />
              datenschutz@norra-sauna.ch
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warmWhite/15">
          <Link to="/" className="text-xs font-mono text-bronze hover:underline">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
};
