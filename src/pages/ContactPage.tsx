import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    canton: 'Zürich',
    interest: 'NØRRA CUBE 01 Standard',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-3">
            Kontakt & Showroom
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-warmWhite font-normal leading-tight">
            Wir freuen uns auf Ihr Projekt.
          </h1>
          <p className="mt-6 text-base text-warmWhite/75 font-sans leading-relaxed">
            Besuchen Sie unser Atelier in Zürich für ein persönliches Beratungsgespräch und die Begutachtung originaler Holzmuster und Konstruktionsdetails.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-warmWhite/15 p-8 bg-graphite/30">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-4">
                Atelier & Showroom
              </span>
              <h3 className="font-serif text-2xl text-warmWhite mb-4">
                NØRRA SAUNA Schweiz
              </h3>

              <div className="space-y-4 font-mono text-xs text-warmWhite/75">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                  <span>
                    Gotthardstrasse 26<br />
                    8002 Zürich<br />
                    Schweiz
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-bronze shrink-0" />
                  <span>+41 44 280 40 80</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-bronze shrink-0" />
                  <span>atelier@norra-sauna.ch</span>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                  <span>
                    Montag – Freitag: 09:00 – 18:30 Uhr<br />
                    Samstag: Nach individueller Terminabsprache
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-warmWhite/15 p-6 bg-charcoal">
              <span className="font-mono text-xs text-bronze uppercase tracking-widest block mb-2">
                Marktregionen
              </span>
              <p className="text-xs font-sans text-warmWhite/70 leading-relaxed">
                Wir planen und liefern in die gesamte Schweiz und Liechtenstein: Zürich, Graubünden (St. Moritz, Davos, Flims), Bern (Gstaad, Grindelwald), Wallis (Zermatt, Verbier), Luzern, Tessin und Genferseeregion.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 border border-warmWhite/20 bg-graphite/40 p-8 sm:p-12">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-bronze/20 border border-bronze flex items-center justify-center mx-auto text-bronze">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-warmWhite">
                  Vielen Dank für Ihre Anfrage
                </h3>
                <p className="text-sm font-sans text-warmWhite/75 max-w-md mx-auto leading-relaxed">
                  Ihre Angaben wurden in dieser Demo erfolgreich erfasst. Ein NØRRA Saunaberater wird sich werktags innerhalb von 24 Stunden mit Ihnen in Verbindung setzen.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-graphite border border-warmWhite/20 text-warmWhite text-xs font-mono uppercase tracking-wider hover:border-bronze"
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze block">
                  Projektanfrage & Ateliertermin
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmWhite/60 mb-2">
                      Vor- & Nachname *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="z.B. Beat Zimmermann"
                      className="w-full px-4 py-3 bg-charcoal border border-warmWhite/20 text-warmWhite font-mono text-xs focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmWhite/60 mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="b.zimmermann@bluewin.ch"
                      className="w-full px-4 py-3 bg-charcoal border border-warmWhite/20 text-warmWhite font-mono text-xs focus:border-bronze focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmWhite/60 mb-2">
                      Telefonnummer
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 79 000 00 00"
                      className="w-full px-4 py-3 bg-charcoal border border-warmWhite/20 text-warmWhite font-mono text-xs focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmWhite/60 mb-2">
                      Kanton / Region
                    </label>
                    <input
                      type="text"
                      value={formData.canton}
                      onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                      placeholder="z.B. Graubünden, Zürich..."
                      className="w-full px-4 py-3 bg-charcoal border border-warmWhite/20 text-warmWhite font-mono text-xs focus:border-bronze focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warmWhite/60 mb-2">
                    Ihre Wünsche oder Fragen
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Beschreiben Sie Ihre bauliche Situation (z.B. Terrasse, Garten, Hanglage) oder besondere Ausstattungswünsche..."
                    className="w-full px-4 py-3 bg-charcoal border border-warmWhite/20 text-warmWhite font-mono text-xs focus:border-bronze focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-bronze text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all flex items-center justify-center gap-2 shadow-2xl"
                  >
                    <span>Anfrage unverbindlich absenden</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] font-mono text-warmWhite/40 mt-3 text-center">
                    Frontend-Demonstrator. Keine Speicherung personenbezogener Daten auf externen Servern.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
