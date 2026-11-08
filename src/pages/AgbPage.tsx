import React from 'react';
import { Link } from 'react-router-dom';

export const AgbPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
          Geschäftsbedingungen
        </span>
        <h1 className="font-serif text-4xl text-warmWhite mb-8">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <div className="space-y-6 font-mono text-xs text-warmWhite/80 leading-relaxed border-t border-warmWhite/15 pt-8">
          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">1. Geltungsbereich</h3>
            <p>
              Diese Geschäftsbedingungen regeln die Rahmenbedingungen für Beratung, Planung und Lieferung von Saunabauten durch NØRRA SAUNA innerhalb der Schweiz und des Fürstentums Liechtenstein.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">2. Showroom-Demonstration & Richtpreise</h3>
            <p>
              Alle im digitalen 3D-Showroom genannten Preise sind unverbindliche Richtpreise in Schweizer Franken (CHF) inklusive gesetzlicher Schweizer Mehrwertsteuer. Ein rechtsgültiger Werkvertrag kommt erst nach Vor-Ort-Besichtigung, statischer Prüfung der Zufahrts- und Fundamentsituation und schriftlicher gegenseitiger Auftragsbestätigung zustande.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">3. Lieferung und Montage</h3>
            <p>
              Die Anlieferung erfolgt in Abstimmung mit spezialisierten Schweizer Schwertransport- und Hebeunternehmen. Die Zufahrtsmöglichkeit für LKW oder die Bewilligung für Helikopter-Überflüge werden vorab detailliert geprüft.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">4. Gewährleistung & Garantie</h3>
            <p>
              Auf die thermisch modifizierte Holzkonstruktion gewähren wir 10 Jahre Garantie gegen Fäulnis und Durchfeuchtung. Auf technische Komponenten (Heizgeräte, Steuerungen, LED) gilt eine Garantie von 24 Monaten nach Schweizer Obligationenrecht (OR).
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warmWhite mb-1">5. Anwendbares Recht & Gerichtsstand</h3>
            <p>
              Anwendbar ist ausschliesslich Schweizer Recht unter Ausschluss des UN-Kaufrechts (CISG). Ausschliesslicher Gerichtsstand für alle Streitigkeiten ist Zürich, Schweiz.
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
