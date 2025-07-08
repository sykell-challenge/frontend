import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      // Colors are now defined in index.css under @theme
    },
  },
  plugins: [],  
};

export default config;
