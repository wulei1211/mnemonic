import { Config, createConfig } from '@umijs/test';

export default {
  ...createConfig(),
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/wallet/$1'
  },
  collectCoverageFrom: ['wallet/**/*.{ts,js,tsx,jsx}'],
} as Config.InitialOptions;
