import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  shortcuts: {
    'w-fit': { width: 'fit-content' },
    'flex-row-c': 'flex flex-row items-center',
    'flex-col-c': 'flex flex-row items-center',
    'flex-row-cc': 'flex flex-row items-center justify-center',
    'flex-col-cc': 'flex flex-col items-center justify-center',
  },
});
