// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: 'tsconfig.json' },
    ],
  },
  // 👇 solo toma tests en estas 3 carpetas
  testMatch: [
    '<rootDir>/src/__tests__/Matematicas/**/*.test.ts?(x)',
    '<rootDir>/src/__tests__/CienciasNaturales/**/*.test.ts?(x)',
    '<rootDir>/src/__tests__/Arte/**/*.test.ts?(x)',
  ],
  collectCoverageFrom: [
    // opcional: limita cobertura a esos módulos
    'src/**/Matematicas/**/*.{ts,tsx}',
    'src/**/CienciasNaturales/**/*.{ts,tsx}',
    'src/**/Arte/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
