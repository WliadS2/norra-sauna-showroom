import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'Benötige ich in der Schweiz eine Baubewilligung für den NØRRA CUBE 01?',
      a: 'In den meisten Schweizer Kantonen gilt eine freistehende Aussensauna als Kleinbaute oder Nebenbaute. Je nach Kanton, Gemeinde und Grenzabstand (oft genügen 2 bis 3 Meter zur Nachbargrenze) reicht ein vereinfachtes Meldeverfahren (Bauanzeige). In einigen Kantonen ist für Bauten unter 10–12 m² Grundfläche und max. 2.50 m Firsthöhe kein ordentliches Baugesuch nötig. Unser Atelier stellt Ihnen sämtliche Pläne und Schnitte für die Baueingabe kostenlos zur Verfügung.',
    },
    {
      q: 'Welche Fundamente sind für die Aufstellung erforderlich?',
      a: 'Dank des verwindungssteifen Stahlrahmens des CUBE 01 ist keine durchgehende Betonplatte zwingend nötig. Oft genügen 6 bis 8 ausnivellierte Beton-Punktfundamente, Schraubfundamente (Erdanker) oder eine tragfähige, frostsichere Naturstein- bzw. Terrassenfläche.',
    },
    {
      q: 'Welche Elektroanschlüsse werden benötigt?',
      a: 'Für den 9.0 bis 12.0 kW Elektro-Turmofen wird ein 400V Drehstromanschluss (3 Phasen, N, PE) mit 16A Absicherung und FI-Schutzschalter benötigt. Die Zuleitung wird unsichtbar von unten in den Installationsraum der Sauna eingeführt. Bei Wahl des traditionellen Holzofens ist kein Starkstrom erforderlich; es genügt ein 230V-Anschluss für die LED-Beleuchtung (oder autarker Akkubetrieb).',
    },
    {
      q: 'Wie verhält sich das karbonisierte Thermoholz bei Schnee, Frost und Sonne?',
      a: 'Thermoholz ist durch die 210°C Hochtemperaturbehandlung dauerhaft formstabil. Das Quell- und Schwindverhalten ist um bis zu 80% reduziert. Es nimmt kaum Wasser auf und gefriert nicht auf. Im Laufe der Jahre entwickelt das Holz unter alpiner UV-Strahlung eine edle, silbergraue Patina, sofern es nicht jährlich mit natürlichem Pflegeöl nachbehandelt wird.',
    },
    {
      q: 'Wie lange dauert das Aufheizen bei minus 15 Grad im Winter?',
      a: 'Dank der hocheffizienten 120mm Holzfaserdämmung und des 3-fach Isolierglases mit Ug 0.6 W/(m²K) erreicht der CUBE 01 auch bei eisigen Aussentemperaturen nach rund 45 Minuten wohlige 85°C. Die Wärme wird über viele Stunden gespeichert.',
    },
    {
      q: 'Wie wird die Sauna geliefert und montiert?',
      a: 'Die Sauna wird zu 95% im Werk vorgefertigt und als monolithischer Block auf einem Spezialtieflader transportiert. Vor Ort hebt ein Pneukran oder bei schwer zugänglichen Hanglagen ein Helikopter (z.B. Air Glaciers) den Kubus millimetergenau auf das vorbereitete Fundament. Innerhalb weniger Stunden ist die Sauna betriebsbereit.',
    },
    {
      q: 'Kann die Sauna bei einem späteren Umzug mitgenommen werden?',
      a: 'Ja. Die monolithische Modulbauweise erlaubt es, die Sauna jederzeit wieder per Kran oder Helikopter anzuheben und an einen neuen Standort zu überführen. Ihre Investition bleibt dauerhaft mobil.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-3">
            Häufige Fragen
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-warmWhite font-normal leading-tight">
            Wissenswertes rund um Planung & Bau.
          </h1>
          <p className="mt-6 text-base text-warmWhite/75 font-sans leading-relaxed">
            Antworten auf die wichtigsten Fragen zu Baubewilligungen in der Schweiz, Fundamenten, Elektrik und der alpinen Logistik.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-warmWhite/15 bg-graphite/30 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-warmWhite">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-bronze shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-warmWhite/10 text-sm font-sans text-warmWhite/80 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct contact box */}
        <div className="border border-warmWhite/15 p-8 bg-charcoal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-warmWhite mb-1">
              Haben Sie eine spezifische Frage?
            </h3>
            <p className="text-xs font-mono text-warmWhite/60">
              Unser Atelier-Team in Zürich berät Sie gerne unverbindlich.
            </p>
          </div>
          <Link
            to="/kontakt"
            className="px-6 py-3.5 bg-warmWhite text-charcoal text-xs font-mono uppercase tracking-widest font-semibold hover:bg-bronze hover:text-white transition-all shrink-0 flex items-center gap-2"
          >
            <span>Frage stellen</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
