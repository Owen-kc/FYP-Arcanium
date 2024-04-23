module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',  // Mock styles
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js'  // Mock images
  },
  testEnvironment: 'jsdom',  
  transformIgnorePatterns: [
    "node_modules/(?!(axios|ldrs|three|other-package-to-transform)/)"
  ]
};
