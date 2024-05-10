/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // rootDir: '.',
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    transform: {
      /* Use babel-jest to transpile tests with the next/babel preset
  https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
      "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets:
        ["next/babel"]
      }]
    },
  // transform: {
  //   // "^.+\\.(t|j)sx?$": "ts-jest",
  //   '^.+\\.tsx?$': 'babel-jest',
  // }
};
