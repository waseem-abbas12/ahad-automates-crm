import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { MbbsChinaPage } from './pages/MbbsChinaPage';
import { ProgramsDirectoryPage } from './pages/ProgramsDirectoryPage';
import { UniversityDetailPage } from './pages/UniversityDetailPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { AdmissionProcessPage } from './pages/AdmissionProcessPage';
import { LifeInChinaPage } from './pages/LifeInChinaPage';
import { CareerLicensingPage } from './pages/CareerLicensingPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyOnlinePage } from './pages/ApplyOnlinePage';

function AppContent() {
  const { currentPath } = useRouter();

  // Dynamic route matcher for /university/:id
  if (currentPath.startsWith('/university/')) {
    const universityId = currentPath.replace('/university/', '');
    return (
      <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          <UniversityDetailPage universityId={universityId} />
        </main>
        <Footer />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/mbbs-in-china':
        return <MbbsChinaPage />;
      case '/programs':
        return <ProgramsDirectoryPage />;
      case '/scholarships':
        return <ScholarshipsPage />;
      case '/admission-process':
        return <AdmissionProcessPage />;
      case '/life-in-china':
        return <LifeInChinaPage />;
      case '/career-licensing':
        return <CareerLicensingPage />;
      case '/about-us':
        return <AboutUsPage />;
      case '/contact':
        return <ContactPage />;
      case '/apply':
        return <ApplyOnlinePage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
