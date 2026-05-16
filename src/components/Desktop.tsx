import { useState } from 'react';
import Window from './Window';

type WindowId = 'about' | 'research' | 'papers' | 'contact';

type WindowState = {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  open: boolean;
};

const initialWindows: WindowState[] = [
  {
    id: 'about',
    title: 'about.txt',
    x: 72,
    y: 72,
    width: 420,
    height: 260,
    z: 1,
    open: true,
  },
  {
    id: 'research',
    title: 'research.exe',
    x: 260,
    y: 132,
    width: 540,
    height: 340,
    z: 2,
    open: true,
  },
  {
    id: 'papers',
    title: 'papers',
    x: 160,
    y: 360,
    width: 520,
    height: 280,
    z: 3,
    open: true,
  },
  {
    id: 'contact',
    title: 'contact.url',
    x: 760,
    y: 96,
    width: 360,
    height: 220,
    z: 4,
    open: true,
  },
];

export default function Desktop() {
  const [windows, setWindows] = useState(initialWindows);

  function focusWindow(id: WindowId) {
    setWindows((current) => {
      const maxZ = Math.max(...current.map((window) => window.z));
      return current.map((window) =>
        window.id === id ? { ...window, z: maxZ + 1 } : window,
      );
    });
  }

  function closeWindow(id: WindowId) {
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, open: false } : window,
      ),
    );
  }

  function openWindow(id: WindowId) {
    setWindows((current) => {
      const maxZ = Math.max(...current.map((window) => window.z));
      return current.map((window) =>
        window.id === id ? { ...window, open: true, z: maxZ + 1 } : window,
      );
    });
  }

  return (
    <main className="desktop">
      <div className="desktop-icons" aria-label="Desktop shortcuts">
        {windows.map((window) => (
          <button
            key={window.id}
            className="desktop-icon"
            onClick={() => openWindow(window.id)}
          >
            <span className="desktop-icon-image">▣</span>
            <span>{window.title}</span>
          </button>
        ))}
      </div>

      {windows
        .filter((window) => window.open)
        .map((window) => (
          <Window
            key={window.id}
            title={window.title}
            defaultPosition={{ x: window.x, y: window.y }}
            defaultSize={{ width: window.width, height: window.height }}
            zIndex={window.z}
            onFocus={() => focusWindow(window.id)}
            onClose={() => closeWindow(window.id)}
          >
            {window.id === 'about' && (
              <>
                <h1>Matteo Cagnotti</h1>
                <p>
                  PhD student in mathematics at the University of Turin.
                </p>
                <p>
                  I work on stochastic differential equations with singular
                  drift, martingale problems, PDE methods, and numerical
                  approximation.
                </p>
              </>
            )}

            {window.id === 'research' && (
              <>
                <h2>Research</h2>
                <p>
                  My current work studies SDEs with distributional drift using
                  martingale problem formulations and backward Kolmogorov PDEs.
                </p>
                <ul>
                  <li>Distributional drift and martingale problems</li>
                  <li>Backward PDE estimates in Besov-Hölder spaces</li>
                  <li>Weak stability and numerical approximation</li>
                  <li>Fractional Brownian and skew-noise variants</li>
                </ul>
              </>
            )}

            {window.id === 'papers' && (
              <>
                <h2>Papers</h2>
                <p>Drafts and preprints will go here.</p>
                <ul>
                  <li>
                    <strong>Numerical approximation for SDEs with
                    distributional drift</strong>
                  </li>
                  <li>
                    <strong>Integrals along martingale-problem solutions</strong>
                  </li>
                </ul>
              </>
            )}

            {window.id === 'contact' && (
              <>
                <h2>Contact</h2>
                <p>
                  Email: <a href="mailto:matteo@example.com">matteo@example.com</a>
                </p>
                <p>
                  GitHub:{' '}
                  <a href="https://github.com/cagnotti-matteo">
                    cagnotti-matteo
                  </a>
                </p>
              </>
            )}
          </Window>
        ))}

      <div className="taskbar">
        <button className="start-button">start</button>
        <div className="taskbar-title">Matteo Cagnotti — Research Desktop</div>
      </div>
    </main>
  );
}