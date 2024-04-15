module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Ensure all JS/JSX files are transpiled
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',  // Handle CSS imports
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js'
    },
    testEnvironment: 'jsdom',  // Use the jsdom environment
    transformIgnorePatterns: [
      "node_modules/(?!(axios|ldrs|other-package-to-transform)/)"  // Transpile 'axios', 'ldrs', and other specific packages
    ]
  };
  