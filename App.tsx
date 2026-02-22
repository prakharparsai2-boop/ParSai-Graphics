import React, { useEffect, useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './App.css';

// Lazy load components for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services'));
const MyWork = lazy(() => import('./pages/MyWork'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always scroll to top when the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const assets = [
      '/3d-animation.jpg',
      '/arrow.gif',
      '/event-video.jpg',
      '/hero.png',
      '/mr-beast.jpg',
      '/prakhar.jpg',
      '/talking-head.jpg',
    ];

    const totalAssets = assets.length + 1; // +1 for fonts
    let loadedCount = 0;
    let assetsLoaded = false;
    let timerFinished = false;

    const startTime = Date.now();
    const minDuration = 1500; // 1.5 seconds

    // Update progress based on time to ensure smooth linear movement
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min((elapsedTime / minDuration) * 100, 100);

      // We want the progress shown to be the minimum of time-based progress and asset-based progress
      // But actually, for a "smooth" feel, let's just use time-based primarily and cap it until assets are ready
      // if we want to be honest. Or just use time-based and wait at 99 if assets aren't done.

      if (assetsLoaded) {
        setProgress(timeProgress);
        if (timeProgress >= 100) {
          timerFinished = true;
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 500);
        }
      } else {
        // Stay at max 95% until assets are actually loaded
        setProgress(Math.min(timeProgress, 95));
      }
    }, 16); // ~60fps

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalAssets) {
        assetsLoaded = true;
      }
    };

    // Preload Images
    assets.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
    });

    // Preload Fonts
    if (document.fonts) {
      document.fonts.ready.then(checkAllLoaded).catch(checkAllLoaded);
    } else {
      checkAllLoaded();
    }

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <Router>
      <Loader progress={progress} isLoading={isLoading} />
      <ScrollToTop />
      {/* 
        Only render the app content once we are not loading.
        This ensures entrance animations start exactly when the site is revealed.
      */}
      {!isLoading && (
        <div className="app-wrapper loaded">
          <Navbar />
          <main>
            <Suspense fallback={<div className="route-loader"></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/work" element={<MyWork />} />
                <Route path="/work/:slug" element={<ProjectDetail />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
};


export default App;