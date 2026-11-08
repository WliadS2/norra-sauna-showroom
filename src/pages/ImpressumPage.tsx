import React from 'react';
import { Link } from 'react-router-dom';

export const ImpressumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
          Rechtliche Hinweise
        </span>
        <h1 className="font-serif text-4xl text-warmWhite mb-8">
          Impressum
        </h1>

        <div className="space-y-6 font-mono text-xs text-warmWhite/80 leading-relaxed border-t border-warmWhite/15 pt-8">
          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">Angaben gemäss Schweizer Recht</h3>
            <p>
              NØRRA SAUNA Schweiz AG (in Gründung / Demonstrator)<br />
              Gotthardstrasse 26<br />
              8002 Zürich<br />
              Schweiz
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">Kontakt</h3>
            <p>
              Telefon: +41 44 280 40 80<br />
              E-Mail: info@norra-sauna.ch<br />
              Webseite: www.norra-sauna.ch
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">Handelsregister & Mehrwertsteuer</h3>
            <p>
              Handelsregisteramt des Kantons Zürich: CHE-123.456.789 (Demonstrations-Showroom)<br />
              Mehrwertsteuernummer: CHE-123.456.789 MWST
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">Haftungsausschluss</h3>
            <p>
              Diese Webanwendung dient als interaktive Technologiedemonstration für ein 3D-E-Commerce-Erlebnis. Alle dargestellten Produkte, Renderings und Preise (CHF) sind unverbindliche Richtwerte zu Veranschaulichungszwecken. Es werden keine realen Zahlungen oder vertraglichen Bestellungen über diesen Showcase abgewickelt.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">Urheberrechte</h3>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, 3D-Geometrien, Texten oder anderen Dateien auf dieser Website gehören ausschliesslich NØRRA SAUNA oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung im Voraus einzuholen.
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
