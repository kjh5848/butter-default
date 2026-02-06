
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { VideoSection, AgentFirst, FeatureExplorer } from './components/Features';
import { UseCases, TrySolutions, LatestBlogs, DownloadSection } from './components/Resources';
import Footer from './components/Footer';
import BufferDashboard from './components/BufferDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'buffer'>('home');

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <VideoSection />
            <AgentFirst />
            <FeatureExplorer />
            <UseCases />
            <TrySolutions />
            <LatestBlogs />
            <DownloadSection />
          </>
        ) : (
          <BufferDashboard />
        )}
      </main>
      
      {currentPage === 'home' && <Footer />}
    </div>
  );
}

export default App;
