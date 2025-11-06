// src/setupTests.ts
import '@testing-library/jest-dom';

// ---- mock: window.matchMedia (Navbar u otros pueden llamarlo) ----
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),            // legacy
      removeListener: jest.fn(),         // legacy
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
}

// ---- mock: HTMLCanvasElement.getContext ('2d') ----
if (!HTMLCanvasElement.prototype.getContext) {
  // @ts-expect-error jsdom no implementa canvas 2D
  HTMLCanvasElement.prototype.getContext = function getContext(type: string) {
    // ✅ Usamos el parámetro `type` para evitar el error de no-unused-vars
    if (type !== '2d') return null;

    const noop = () => {};

    // Suficiente para tu componente ColorMixer (clearRect, beginPath, arc, fill, stroke, etc.)
    const ctx = {
      canvas: this,
      // drawing state
      fillStyle: '#000000',
      strokeStyle: '#000000',
      lineWidth: 1,
      // APIs usadas
      clearRect: noop,
      beginPath: noop,
      arc: noop,
      fill: noop,
      stroke: noop,
      // extras comunes (por si en el futuro se usan)
      rect: noop,
      moveTo: noop,
      lineTo: noop,
      closePath: noop,
      save: noop,
      restore: noop,
      translate: noop,
      scale: noop,
      rotate: noop,
    };

    
    return ctx as unknown as CanvasRenderingContext2D;
  };
}
