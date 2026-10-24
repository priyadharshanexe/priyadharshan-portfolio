import { build } from 'esbuild';
import { copyFile } from 'node:fs/promises';

await build({
  entryPoints: ['src/projects.jsx'],
  outfile: 'priyadharshan-portfolio/project-carousel.js',
  bundle: true,
  minify: true,
  jsx: 'automatic',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'eof',
  banner: {
    js: '/* React Bits FlexCarousel by David Haz; React, React DOM, and OGL. See LICENSE.txt. Source: src/carousel/FlexCarousel.jsx. */'
  }
});

await copyFile('LICENSE', 'priyadharshan-portfolio/LICENSE.txt');
