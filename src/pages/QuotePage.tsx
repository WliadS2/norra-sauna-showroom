import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Printer, Share2, ShieldCheck } from 'lucide-react';
import {
  SaunaConfig,
  DEFAULT_CONFIG,
  calculateConfigPrice,
  formatCHF,
  SIZE_SPECS,
  EXTERIOR_OPTIONS,
  INTERIOR_OPTIONS,
  GLAZING_OPTIONS,
  HEATER_OPTIONS,
} from '@/types/configurator';

export const QuotePage: React.FC = () => {
  // Read saved config or fallback to default
  const [config] = useState<SaunaConfig>(() => {
    try {
      const saved = localStorage.getItem('norra_saved_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [deliveryOption, setDeliveryOption] = useState<'standard-crane' | 'pass-transport' | 'heli'>('standard-crane');
  const [copied, setCopied] = useState(false);

  const basePrice = calculateConfigPrice(config);

  const deliveryCost = {
    'standard-crane': 1850,
    'pass-transport': 2600,
    'heli': 4900,
  }[deliveryOption];

  const assemblyCost = 2200; // Standard on-site positioning & connection briefing
  const totalQuote = basePrice + deliveryCost + assemblyCost;

  const currentSize = SIZE_SPECS[config.size];
  const currentExt = EXTERIOR_OPTIONS.find((e) => e.id === config.exterior);
  const currentInt = INTERIOR_OPTIONS.find((i) => i.id === config.interior);
  const currentGlz = GLAZING_OPTIONS.find((g) => g.id === config.glazing);
  const currentHtr = HEATER_OPTIONS.find((h) => h.id === config.heater);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `NØRRA SAUNA SCHWEIZ — RICHTPREIS-OFFERTE
Datum: ${new Date().toLocaleDateString('de-CH')}
Modell: NØRRA CUBE 01 (${currentSize.label})
Aussen: ${currentExt?.name}
Innen: ${currentInt?.name}
Glas: ${currentGlz?.name}
Ofen: ${currentHtr?.name}
Saunakorpus: ${formatCHF(basePrice)}
Transport: ${formatCHF(deliveryCost)}
Montage: ${formatCHF(assemblyCost)}
Gesamt-Richtpreis: ${formatCHF(totalQuote)} (inkl. Schweizer MwSt.)`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite pt-32 pb-24 px-6 sm:px-12 lg:px-16 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-warmWhite/15 pb-8 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 print:border-black/20">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-2">
              Unverbindliche Richtpreis-Offerte
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-warmWhite print:text-black font-normal">
              Kalkulation NØRRA CUBE 01
            </h1>
            <p className="mt-2 text-xs font-mono text-warmWhite/60 print:text-black/60">
              Offerten-Referenz: #NORRA-CH-{Math.floor(100000 + Math.random() * 900000)} · Markt: Schweiz
            </p>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-graphite border border-warmWhite/20 hover:border-bronze text-warmWhite text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-bronze" />
              <span>Drucken</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-graphite border border-warmWhite/20 hover:border-bronze text-warmWhite text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 text-bronze" />
              <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
            </button>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="border border-warmWhite/20 bg-graphite/40 p-8 sm:p-12 mb-12 print:border-black/20 print:bg-white">
          <h2 className="font-serif text-2xl text-warmWhite print:text-black mb-6">
            1. Konfigurierter Saunakörper
          </h2>

          <div className="space-y-4 font-mono text-xs border-b border-warmWhite/10 pb-6 mb-8 print:border-black/10">
            <div className="flex justify-between py-2 border-b border-warmWhite/5">
              <div>
                <span className="text-warmWhite font-semibold block print:text-black">
                  NØRRA CUBE 01 ({currentSize.label})
                </span>
                <span className="text-warmWhite/50 block print:text-black/60">
                  Masse: {currentSize.width}m × {currentSize.depth}m × {currentSize.height}m
                </span>
              </div>
              <span className="text-warmWhite font-medium print:text-black">
                {formatCHF(currentSize.basePriceCHF)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-warmWhite/5">
              <div>
                <span className="text-warmWhite block print:text-black">Fassade: {currentExt?.name}</span>
                <span className="text-warmWhite/50 block print:text-black/60">{currentExt?.tagline}</span>
              </div>
              <span className="text-warmWhite print:text-black">
                {currentExt?.priceDeltaCHF === 0 ? 'Inklusive' : formatCHF(currentExt?.priceDeltaCHF || 0)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-warmWhite/5">
              <div>
                <span className="text-warmWhite block print:text-black">Innenraum: {currentInt?.name}</span>
                <span className="text-warmWhite/50 block print:text-black/60">{currentInt?.tagline}</span>
              </div>
              <span className="text-warmWhite print:text-black">
                {currentInt?.priceDeltaCHF === 0 ? 'Inklusive' : formatCHF(currentInt?.priceDeltaCHF || 0)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-warmWhite/5">
              <div>
                <span className="text-warmWhite block print:text-black">Verglasung: {currentGlz?.name}</span>
                <span className="text-warmWhite/50 block print:text-black/60">{currentGlz?.tagline}</span>
              </div>
              <span className="text-warmWhite print:text-black">
                {currentGlz?.priceDeltaCHF === 0 ? 'Inklusive' : formatCHF(currentGlz?.priceDeltaCHF || 0)}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <div>
                <span className="text-warmWhite block print:text-black">Heizung: {currentHtr?.name}</span>
                <span className="text-warmWhite/50 block print:text-black/60">{currentHtr?.tagline}</span>
              </div>
              <span className="text-warmWhite print:text-black">
                {currentHtr?.priceDeltaCHF === 0 ? 'Inklusive' : formatCHF(currentHtr?.priceDeltaCHF || 0)}
              </span>
            </div>
          </div>

          {/* Transport & Montage Options */}
          <h2 className="font-serif text-2xl text-warmWhite print:text-black mb-4">
            2. Logistik & Aufstellung Schweiz
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 print:hidden">
            <button
              onClick={() => setDeliveryOption('standard-crane')}
              className={`p-3 text-left border text-xs font-mono transition-all ${
                deliveryOption === 'standard-crane'
                  ? 'border-bronze bg-charcoal'
                  : 'border-warmWhite/15 bg-charcoal/40 hover:border-warmWhite/30'
              }`}
            >
              <span className="block font-semibold text-warmWhite">Standard LKW + Kran</span>
              <span className="block text-warmWhite/50 text-[10px] mt-1">Ebenerdige Zufahrt</span>
              <span className="block text-bronze mt-2 font-bold">{formatCHF(1850)}</span>
            </button>

            <button
              onClick={() => setDeliveryOption('pass-transport')}
              className={`p-3 text-left border text-xs font-mono transition-all ${
                deliveryOption === 'pass-transport'
                  ? 'border-bronze bg-charcoal'
                  : 'border-warmWhite/15 bg-charcoal/40 hover:border-warmWhite/30'
              }`}
            >
              <span className="block font-semibold text-warmWhite">Passstrasse / Allrad</span>
              <span className="block text-warmWhite/50 text-[10px] mt-1">Erhöhte Alpenregion</span>
              <span className="block text-bronze mt-2 font-bold">{formatCHF(2600)}</span>
            </button>

            <button
              onClick={() => setDeliveryOption('heli')}
              className={`p-3 text-left border text-xs font-mono transition-all ${
                deliveryOption === 'heli'
                  ? 'border-bronze bg-charcoal'
                  : 'border-warmWhite/15 bg-charcoal/40 hover:border-warmWhite/30'
              }`}
            >
              <span className="block font-semibold text-warmWhite">Helikopter-Einflug</span>
              <span className="block text-warmWhite/50 text-[10px] mt-1">Nicht befahrbare Hanglage</span>
              <span className="block text-bronze mt-2 font-bold">{formatCHF(4900)}</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs border-b border-warmWhite/10 pb-6 mb-8 print:border-black/10">
            <div className="flex justify-between py-1">
              <span className="text-warmWhite/70 print:text-black">
                Transportzustellung (gewählte Option)
              </span>
              <span className="text-warmWhite print:text-black">{formatCHF(deliveryCost)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-warmWhite/70 print:text-black">
                Montagebegleitung, Endausrichtung & Einweisung vor Ort
              </span>
              <span className="text-warmWhite print:text-black">{formatCHF(assemblyCost)}</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="flex items-center justify-between p-6 bg-charcoal border border-warmWhite/20 print:bg-black/5 print:border-black/20">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-warmWhite/60 print:text-black/60 block">
                Gesamter Richtpreis
              </span>
              <span className="font-mono text-xs text-warmWhite/40 print:text-black/40">
                Inklusive 8.1% Schweizer Mehrwertsteuer
              </span>
            </div>
            <span className="font-mono text-3xl sm:text-4xl text-bronze font-bold">
              {formatCHF(totalQuote)}
            </span>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="p-6 border border-warmWhite/15 bg-charcoal/60 mb-12 flex items-start gap-3 text-xs font-mono text-warmWhite/60 print:text-black/60">
          <ShieldCheck className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Dies ist eine unverbindliche Richtpreis-Kalkulation im Rahmen dieser digitalen Showroom-Demonstration. Für verbindliche Offerten inklusive bauseitiger Fundamentprüfung und Elektroanschlussvereinbarung kontaktieren Sie bitte unser Atelier in Zürich.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 print:hidden">
          <Link
            to="/konfigurator"
            className="flex-1 py-4 bg-graphite border border-warmWhite/20 text-warmWhite text-center text-xs font-mono uppercase tracking-widest hover:border-bronze transition-colors"
          >
            Zurück zum 3D-Konfigurator
          </Link>
          <Link
            to="/kontakt"
            className="flex-1 py-4 bg-bronze text-white text-center text-xs font-mono uppercase tracking-widest font-semibold hover:bg-warmWhite hover:text-charcoal transition-all shadow-2xl"
          >
            Beratung im Atelier Zürich Anfragen
          </Link>
        </div>
      </div>
    </div>
  );
};
