import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';

import { HomePage } from '@/pages/HomePage';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ConfiguratorPage } from '@/pages/ConfiguratorPage';
import { TheWayPage } from '@/pages/TheWayPage';
import { MaterialsPage } from '@/pages/MaterialsPage';
import { AtelierPage } from '@/pages/AtelierPage';
import { QuotePage } from '@/pages/QuotePage';
import { ContactPage } from '@/pages/ContactPage';
import { FaqPage } from '@/pages/FaqPage';
import { ImpressumPage } from '@/pages/ImpressumPage';
import { DatenschutzPage } from '@/pages/DatenschutzPage';
import { AgbPage } from '@/pages/AgbPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-charcoal text-warmWhite overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kollektion" element={<CollectionPage />} />
            <Route path="/kollektion/cube-01" element={<ProductDetailPage />} />
            <Route path="/konfigurator" element={<ConfiguratorPage />} />
            <Route path="/der-weg" element={<TheWayPage />} />
            <Route path="/materialien" element={<MaterialsPage />} />
            <Route path="/atelier" element={<AtelierPage />} />
            <Route path="/offerte" element={<QuotePage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/agb" element={<AgbPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
