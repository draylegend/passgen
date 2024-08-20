import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import fluid, { extract, fontSize, screens } from 'fluid-tailwind';
import { join } from 'path';
import { Config } from 'tailwindcss';

export default {
  content: {
    extract,
    files: [
      join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
      ...createGlobPatternsForDependencies(__dirname),
    ],
  },
  plugins: [fluid],
  theme: {
    fontSize,
    screens,
  },
} satisfies Config;
