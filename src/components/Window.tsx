import { Rnd } from 'react-rnd';
import type { ReactNode } from 'react';

type WindowProps = {
  title: string;
  children: ReactNode;
  defaultPosition: {
    x: number;
    y: number;
  };
  defaultSize: {
    width: number;
    height: number;
  };
  zIndex: number;
  maximized: boolean;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

export default function Window({
  title,
  children,
  defaultPosition,
  defaultSize,
  zIndex,
  maximized,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
}: WindowProps) {
  if (maximized) {
    return (
      <section
        className="window window-maximized"
        style={{ zIndex }}
        onMouseDown={onFocus}
      >
        <header className="window-titlebar">
          <span className="window-title">{title}</span>

          <div className="window-buttons">
            <button type="button" aria-label="Minimize window" onClick={onMinimize}>
              –
            </button>
            <button type="button" aria-label="Restore window" onClick={onMaximize}>
              □
            </button>
            <button type="button" aria-label="Close window" onClick={onClose}>
              ×
            </button>
          </div>
        </header>

        <div className="window-body">{children}</div>
      </section>
    );
  }

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={280}
      minHeight={160}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      <section className="window">
        <header className="window-titlebar">
          <span className="window-title">{title}</span>

          <div className="window-buttons">
            <button type="button" aria-label="Minimize window" onClick={onMinimize}>
              –
            </button>
            <button type="button" aria-label="Maximize window" onClick={onMaximize}>
              □
            </button>
            <button type="button" aria-label="Close window" onClick={onClose}>
              ×
            </button>
          </div>
        </header>

        <div className="window-body">{children}</div>
      </section>
    </Rnd>
  );
}