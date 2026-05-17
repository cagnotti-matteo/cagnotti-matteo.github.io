import { useEffect, useState } from 'react';
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
    width: 700,
    height: 350,
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
    width: 620,
    height: 360,
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
    x: 330,
    y: 120,
    width: 700,
    height: 350,
    z: 10,
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
    width: 620,
    height: 360,
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)');

    function update() {
      setIsMobile(query.matches);
    }

    update();
    query.addEventListener('change', update);

    return () => {
      query.removeEventListener('change', update);
    };
  }, []);

  return isMobile;
}

function getContent(kind: WindowKind) {
  if (kind === 'about') {
    return (
      <div className="about-layout">
        <div className="about-copy">
          <h1>Matteo Cagnotti</h1>
          <p>
            I am a second-year PhD student in Modeling and Data Science under
            the supervision of Elena Issoglio at the University of Turin.
          </p>
          <p>
            My research is about the numerical approximation of stochastic
            differential equations with singular drift, either through rough
            martingale problems for Brownian-noise SDEs or through
            regularization by noise techniques for fractional Brownian-noise
            SDEs.
          </p>
          <p>
            During the spring of 2026 I will be working in collaboration with
            Rémi Catellier while visiting Université Côte d&apos;Azur, Nice.
          </p>
        </div>

        <figure className="about-photo">
          <img src="/images/matteo.jpg" alt="Matteo Cagnotti" />
        </figure>
      </div>
    );
  }

  if (kind === 'research') {
    return (
      <>
        <h2>Research</h2>
        <p>
          I study SDEs whose drift is too singular to be interpreted pointwise.
        </p>

        <ul>
          <li>Martingale problems with distributional drift</li>
          <li>Backward PDEs with rough coefficients</li>
          <li>Weak error estimates for numerical schemes</li>
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
          <h3>
            <span className="paper-title">
              L<sup>p</sup>-sup convergence of the Euler-Maruyama scheme for
              SDEs with distributional Besov drift
            </span>
          </h3>

          <p>
            Preprint, 2026. I prove convergence rates in L<sup>p</sup>, for
            all <span className="math-inline">p ≥ 2</span>, for the
            Euler-Maruyama scheme applied to one-dimensional Brownian SDEs with
            drift in a negative-order Besov space. The proof uses the
            Yamada-Watanabe approximation technique and gives an explicit L
            <sup>1</sup>-sup convergence rate.
          </p>

          <div className="paper-meta">
            <span>arXiv:2602.02109</span>
            <span>math.PR</span>
            <span>submitted 2 Feb 2026</span>
          </div>

          <div className="paper-links">
            <a
              href="https://arxiv.org/abs/2602.02109"
              target="_blank"
              rel="noreferrer"
            >
              arXiv
            </a>
            <a
              href="https://arxiv.org/pdf/2602.02109"
              target="_blank"
              rel="noreferrer"
            >
              PDF
            </a>
            <a
              href="https://doi.org/10.48550/arXiv.2602.02109"
              target="_blank"
              rel="noreferrer"
            >
              DOI
            </a>
          </div>
        </article>

        <article className="paper-entry">
          <h3>
            Martingale Problems with Distributional Drift: Convergence of the
            Euler Scheme
          </h3>
          <p>Work in progress. Check back later for updates.</p>
        </article>

        <article className="paper-entry">
          <h3>Numerical Schemes for Skew Fractional Brownian Motion</h3>
          <p>
            Work in progress. Check back later for updates. In collaboration
            with Rémi Catellier.
          </p>
        </article>
      </>
    );
  }

  if (kind === 'notes') {
    return (
      <>
        <h2>Notes and Visualizations</h2>
        <p>Informal notes, computations, and things that are not quite papers.</p>
        <a
  href="https://cagnotti-matteo.github.io/singular-drift-playground/"
  target="_blank"
  rel="noreferrer"
>
   Skew fractional BM 
</a>
<span>
  Animated visualisation of fractional-Brownian-like paths, occupation memory,
  and a skew interface.
</span>
        <a
  href="https://cagnotti-matteo.github.io/besov-glitch-field/"
  target="_blank"
  rel="noreferrer"
>
  Besov Glitch Field
</a>
<span>
  — a pixelated drift landscape showing how a rough distributional field becomes visible through mollification.
</span>
      </>
    );
  }

  return (
    <>
      <h2>Contact me</h2>
      <p>
        Email:{' '}
        <a href="mailto:matteo.cagnotti@unito.it">
          matteo.cagnotti@unito.it
        </a>
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
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return (
      <main className="mobile-site">
        <header className="mobile-header">
          <p className="mobile-kicker">Matteo Cagnotti</p>
          <h1>Research</h1>
          <p>
            Stochastic differential equations with singular drift, martingale
            problems, PDE methods, and numerical approximation.
          </p>
        </header>

        <nav className="mobile-nav" aria-label="Page sections">
          {windowTemplates.map((template) => (
            <a key={template.kind} href={`#${template.kind}`}>
              {template.title}
            </a>
          ))}
        </nav>

        <div className="mobile-sections">
          {windowTemplates.map((template) => (
            <section
              key={template.kind}
              id={template.kind}
              className="mobile-card"
            >
              <div className="mobile-card-titlebar">
                <span>{template.title}</span>
              </div>

              <div className="mobile-card-body">{getContent(template.kind)}</div>
            </section>
          ))}
        </div>
      </main>
    );
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

        <div className="taskbar-title">Matteo Cagnotti</div>
      </div>
    </main>
  );
}
