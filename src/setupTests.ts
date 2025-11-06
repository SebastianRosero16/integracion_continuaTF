// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock sólido para <canvas> en JSDOM
// Evita "Not implemented: HTMLCanvasElement.prototype.getContext"
const mockCanvasContext = () => {
  const gradient = { addColorStop: jest.fn() };

  return {
    // Estado/props comunes
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    font: '',

    // Dibujo básico
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    strokeRect: jest.fn(),
    beginPath: jest.fn(),
    closePath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    rect: jest.fn(),
    arc: jest.fn(),
    quadraticCurveTo: jest.fn(),
    bezierCurveTo: jest.fn(),
    clip: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),

    // Transformaciones
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn(),
    setTransform: jest.fn(),
    transform: jest.fn(),

    // Texto
    fillText: jest.fn(),
    strokeText: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),

    // Imágenes y pixeles
    drawImage: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Uint8ClampedArray(0), width: 0, height: 0 })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => ({ data: new Uint8ClampedArray(0), width: 0, height: 0 })),

    // Gradientes y patrones
    createLinearGradient: jest.fn(() => gradient),
    createRadialGradient: jest.fn(() => gradient),
    createPattern: jest.fn(),

    // Hit testing
    isPointInPath: jest.fn(),
    isPointInStroke: jest.fn(),
  } as unknown as CanvasRenderingContext2D;
};

// Mockea getContext y toDataURL antes de cada test
beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn(() => mockCanvasContext()),
    configurable: true,
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    value: jest.fn(() => 'data:image/png;base64,'),
    configurable: true,
  });
});

// Opcional: silenciar el warning específico si quedó en caché
const originalError = console.error;
beforeEach(() => {
  console.error = (...args: any[]) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('Not implemented: HTMLCanvasElement.prototype.getContext')) return;
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
