const config = {
  "moduleDirectories": [
    "node_modules"
  ],
  "moduleFileExtensions": [
    "ts",
    "html",
    "js",
    "json",
    "mjs"
  ],
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  setupFiles: [`<rootDir>/setup.jest.ts`], // uncomment when use jest
  moduleNameMapper: {
    '^avid-ui-lib/(.*)$': '<rootDir>/node_modules/avid-ui-lib$1',
    '^core-js/es7/reflect$': '<rootDir>/node_modules/core-js/proposals/reflect-metadata',
    '^core-js/es6/(.*)$': '<rootDir>/node_modules/core-js/es/',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@services/(.*)$': '<rootDir>/src/app/core/services/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/app/core/interfaces/$1',
    '^@constants/(.*)$': '<rootDir>/src/app/core/constants/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '.scss$': '<rootDir>/mock.style.js'
  }
};
 export default config;
