import { config } from '@finda-co/jest-config/nest/jest-preset';

export default {
  ...config,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  fakeTimers: {
    enableGlobally: true,
  },
};
