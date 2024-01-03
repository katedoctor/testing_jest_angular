console.log('loaded')

const config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  resolver: "<rootDir>/resolver.js",
  transformIgnorePatterns: [`/node_modules/(?!@angular|zone.js/.*)`],
  globalSetup: 'jest-preset-angular/global-setup'
}

 export default config;
