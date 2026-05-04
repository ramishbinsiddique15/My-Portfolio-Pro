import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { useLocation } from 'react-router-dom';
import { useUIStore } from './store/useUIStore';
import { useThemeStore } from './store/useThemeStore';

import Loader from './components/sections/Loader';
import CustomCursor from './components/common/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { PageShutter } from './components/animations'
import Home from './pages/Home';
import Projects from './pages/Projects';
import Logs from './pages/Logs';
import Lab from './pages/Lab';
import Capabilities from './pages/Capabilities';
import Identity from './pages/Identity';

function AppShell() {
  const { isAppLoaded } = useUIStore();
  const { theme } = useThemeStore();
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [showRouteShutter, setShowRouteShutter] = useState(false);
  const routeTimersRef = useRef({ swap: null, scroll: null, hide: null });
  const initialHashHandledRef = useRef(false);

  const scrollToHashTarget = useCallback((hash) => {
    if (!hash) return;

    const targetId = hash.startsWith('#') ? hash.slice(1) : hash;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

useEffect(() => {
    const handler = (e) => {
      const hash = e?.detail?.hash || null;

      if (routeTimersRef.current.swap) {
        window.clearTimeout(routeTimersRef.current.swap);
      }
      if (routeTimersRef.current.scroll) {
        window.clearTimeout(routeTimersRef.current.scroll);
      }
      if (routeTimersRef.current.hide) {
        window.clearTimeout(routeTimersRef.current.hide);
      }

      setShowRouteShutter(true);

routeTimersRef.current.hide = window.setTimeout(() => {
        setShowRouteShutter(false);
      }, 980);
    };

    window.addEventListener('app:trigger-shutter', handler);
    return () => window.removeEventListener('app:trigger-shutter', handler);
  }, []);

  useEffect(() => {
    const pathChanged = location.pathname !== displayLocation.pathname;
    const hashChanged = location.hash !== displayLocation.hash;

    if (!pathChanged && !hashChanged) return;

    if (routeTimersRef.current.swap) {
      window.clearTimeout(routeTimersRef.current.swap);
    }

    if (routeTimersRef.current.scroll) {
      window.clearTimeout(routeTimersRef.current.scroll);
    }

    if (routeTimersRef.current.hide) {
      window.clearTimeout(routeTimersRef.current.hide);
    }

    setShowRouteShutter(true);

    if (pathChanged) {
      routeTimersRef.current.swap = window.setTimeout(() => {
        setDisplayLocation(location);
      }, 520);
    }

    routeTimersRef.current.scroll = window.setTimeout(() => {
      if (location.hash) {
        scrollToHashTarget(location.hash);
      } else if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 640);

    routeTimersRef.current.hide = window.setTimeout(() => {
      setShowRouteShutter(false);
    }, 980);
  }, [location.pathname, location.hash, displayLocation.pathname, displayLocation.hash, scrollToHashTarget]);

  useEffect(() => {
    if (!isAppLoaded || initialHashHandledRef.current || !location.hash) return;

    initialHashHandledRef.current = true;

    const initialHashTimer = window.setTimeout(() => {
      scrollToHashTarget(location.hash);
    }, 650);

    return () => window.clearTimeout(initialHashTimer);
  }, [isAppLoaded, location.hash, scrollToHashTarget]);

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 transition-colors duration-700 font-sans md:cursor-none selection:bg-indigo-500 selection:text-white">
      <CustomCursor />
      <Loader />
      <Navbar />
      <PageShutter visible={showRouteShutter} />

      {isAppLoaded && (
        <>
          <Routes location={displayLocation} key={displayLocation.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/identity" element={<Identity />} />
          </Routes>
          <Footer />
        </>
      )}

    </div>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <Router>
        <AppShell />
      </Router>
    </ReactLenis>
  );
}

export default App;