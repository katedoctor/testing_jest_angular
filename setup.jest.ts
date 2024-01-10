import 'jest-preset-angular/setup-jest.mjs';

jest.mock('avid-ui-lib', () => ({
  AvidUiLibModule: jest.fn(() => ({
    // Provide minimal necessary mock implementation
  }))
}));
