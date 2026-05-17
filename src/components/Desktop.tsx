import { useState } from 'react';
import Window from './Window';

type WindowKind = 'about' | 'research' | 'papers' | 'notes' | 'contact';

type WindowTemplate = {
  kind: WindowKind;
  title: string;
  width: number;
  height: number;
};

type WindowInstance = {
  instanceId: string;
  kind: WindowKind;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

const windowTemplates: WindowTemplate[] = [
  {
    kind: 'about',
    title: 'About',
    width: 420,
    height: 260,
  },
  {
    kind: 'research',
    title: 'Research',
    width: 560,
    height: 360,
  },
  {
    kind: 'papers',
    title: 'Papers',
    width: 560,
    height: 320,
  },
  {
    kind: 'notes',
    title: 'Notes',
    width: 440,
    height: 280,
  },
  {
    kind: 'contact',
    title: 'Contact',
    width: 380,
    height: 220,
  },
];

const initialWindows: WindowInstance[] = [
  {
    instanceId: 'about-1',
    kind: 'about',
    title: 'About',
    x: 72,
    y: 72,
    width: 420,
    height: 260,
    z: 1,
    minimized: false,
    maximized: false,
  },
  {
    instanceId: 'research-1',
    kind: 'research',
    title: 'Research',
    x: 260,
    y: 132,
    width: 560,
    height: 360,
    z: 2,
    minimized: false,
    maximized: false,
  },
  {
    instanceId: 'papers-1',
    kind: 'papers',
    title: 'Papers',
    x: 160,
    y: 380,
    width: 560,
    height: 320,
    z: 3,
    minimized: false,
    maximized: false,
  },
  {
    instanceId: 'contact-1',
    kind: 'contact',
    title: 'Contact',
    x: 780,
    y: 96,
    width: 380,
    height: 220,
    z: 4,
    minimized: false,
    maximized: false,
  },
];

function getContent(kind: WindowKind) {
  if (kind === 'about') {
    return (
      <>
        <h1>Matteo Cagnotti</h1>
        <p>I am a PhD student in mathematics at the University of Turin.</p>
        <p>
          My research is about stochastic differential equations with singular
          drift, martingale problems, PDE methods, and numerical approximation.
        </p>
        <p>
          This page is a small desktop for my papers, talks, notes, and related
          mathematical debris.
        </p>
      </>
    );
  }

  if (kind === 'research') {
    return (
      <>
        <h2>Research</h2>
        <p>
          I study SDEs whose drift is too singular to be interpreted pointwise.
          The main tools are martingale problems, backward Kolmogorov equations,
          Besov-Hölder estimates, and weak stability arguments.
        </p>

        <ul>
          <li>Martingale problems with distributional drift</li>
          <li>Backward PDEs with rough coefficients</li>
          <li>Additive functionals along weak solutions</li>
          <li>Weak error estimates for mollify-discretise schemes</li>
          <li>Fractional Brownian variants and local-time-type drifts</li>
        </ul>
      </>
    );
  }

  if (kind === 'papers') {
    return (
      <>
        <h2>Papers</h2>

        <article className="paper-entry">
          <h3>Numerical approximation for SDEs with distributional drift</h3>
          <p>
            Work in progress. Weak convergence rates for mollify-discretise
            schemes, using PDE testing and stochastic sewing estimates.
          </p>

          <div className="paper-links">
            <a
              href="https://arxiv.org/"
              target="_blank"
              rel="noreferrer"
            >
              arXiv
            </a>
            <a href="/papers/distributional-drift-numerics.pdf">PDF</a>
            <a href="/bib/distributional-drift-numerics.bib">BibTeX</a>
          </div>
        </article>

        <article className="paper-entry">
          <h3>Integrals along martingale-problem solutions</h3>
          <p>
            Construction of additive functionals extending time integrals
            against distributional test objects.
          </p>

          <div className="paper-links">
            <a
              href="https://arxiv.org/"
              target="_blank"
              rel="noreferrer"
            >
              arXiv
            </a>
            <a href="/papers/integrals-martingale-problems.pdf">PDF</a>
            <a href="/bib/integrals-martingale-problems.bib">BibTeX</a>
          </div>
        </article>
      </>
    );
  }

  if (kind === 'notes') {
    return (
      <>
        <h2>Notes</h2>
        <p>Informal notes, computations, and things that are not quite papers.</p>
        <ul>
          <li>Backward Kolmogorov estimates with negative terminal data</li>
          <li>Numerical experiments for rough drifts</li>
          <li>Local time, box drifts, and skew-noise approximations</li>
        </ul>
      </>
    );
  }

  return (
    <>
      <h2>Contact</h2>
      <p>
        Email:{' '}
        <a href="mailto:your.real.email@unito.it">your.real.email@unito.it</a>
      </p>
      <p>
        GitHub:{' '}
        <a
          href="https://github.com/cagnotti-matteo"
          target="_blank"
          rel="noreferrer"
        >
          cagnotti-matteo
        </a>
      </p>
    </>
  );
}

export default function Desktop() {
  const [windows, setWindows] = useState<WindowInstance[]>(initialWindows);
  const [nextId, setNextId] = useState(2);

  function getMaxZ(current: WindowInstance[]) {
    return current.length === 0
      ? 0
      : Math.max(...current.map((window) => window.z));
  }

  function focusWindow(instanceId: string) {
    setWindows((current) => {
      const maxZ = getMaxZ(current);

      return current.map((window) =>
        window.instanceId === instanceId
          ? { ...window, z: maxZ + 1 }
          : window,
      );
    });
  }

  function closeWindow(instanceId: string) {
    setWindows((current) =>
      current.filter((window) => window.instanceId !== instanceId),
    );
  }

  function closeAllWindows() {
    setWindows([]);
  }

  function minimizeWindow(instanceId: string) {
    setWindows((current) =>
      current.map((window) =>
        window.instanceId === instanceId
          ? { ...window, minimized: true, maximized: false }
          : window,
      ),
    );
  }

  function restoreWindow(instanceId: string) {
    setWindows((current) => {
      const maxZ = getMaxZ(current);

      return current.map((window) =>
        window.instanceId === instanceId
          ? {
              ...window,
              minimized: false,
              maximized: false,
              z: maxZ + 1,
            }
          : window,
      );
    });
  }

  function toggleMaximizeWindow(instanceId: string) {
    setWindows((current) => {
      const maxZ = getMaxZ(current);

      return current.map((window) =>
        window.instanceId === instanceId
          ? {
              ...window,
              minimized: false,
              maximized: !window.maximized,
              z: maxZ + 1,
            }
          : window,
      );
    });
  }

  function openWindow(kind: WindowKind) {
    const template = windowTemplates.find((item) => item.kind === kind);

    if (!template) {
      return;
    }

    setWindows((current) => {
      const maxZ = getMaxZ(current);
      const offset = (nextId % 8) * 28;

      const newWindow: WindowInstance = {
        instanceId: `${kind}-${Date.now()}-${nextId}`,
        kind,
        title: template.title,
        x: 96 + offset,
        y: 72 + offset,
        width: template.width,
        height: template.height,
        z: maxZ + 1,
        minimized: false,
        maximized: false,
      };

      return [...current, newWindow];
    });

    setNextId((current) => current + 1);
  }

  const visibleWindows = windows.filter((window) => !window.minimized);

  return (
    <main className="desktop">
      <div className="desktop-icons" aria-label="Desktop shortcuts">
        {windowTemplates.map((template) => (
          <button
            key={template.kind}
            className="desktop-icon"
            onClick={() => openWindow(template.kind)}
          >
            <span className="desktop-icon-image">▣</span>
            <span>{template.title}</span>
          </button>
        ))}
      </div>

      {visibleWindows.map((window) => (
        <Window
          key={window.instanceId}
          title={window.title}
          defaultPosition={{ x: window.x, y: window.y }}
          defaultSize={{ width: window.width, height: window.height }}
          zIndex={window.z}
          maximized={window.maximized}
          onFocus={() => focusWindow(window.instanceId)}
          onMinimize={() => minimizeWindow(window.instanceId)}
          onMaximize={() => toggleMaximizeWindow(window.instanceId)}
          onClose={() => closeWindow(window.instanceId)}
        >
          {getContent(window.kind)}
        </Window>
      ))}


      <div className="taskbar">
        <button className="start-button">start</button>

        <button
          className="taskbar-button"
          onClick={closeAllWindows}
          disabled={windows.length === 0}
        >
          close all
        </button>

        <div className="taskbar-tabs" aria-label="Open windows">
          {windows.map((window) => (
            <button
              key={window.instanceId}
              className={
                window.minimized
                  ? 'taskbar-tab taskbar-tab-minimized'
                  : 'taskbar-tab'
              }
              onClick={() => restoreWindow(window.instanceId)}
              title={window.title}
            >
              {window.title}
            </button>
          ))}
        </div>

        <div className="taskbar-title">Matteo Cagnotti — Research Desktop</div>
      </div>
    </main>
  );
}