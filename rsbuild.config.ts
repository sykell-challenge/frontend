import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import tailwindcssPostcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [pluginReact()],
  html:{
    meta:{
      visualViewport:"initial-scale=1, width=device-width"
    }
  },
  source: {
    define: {
      // Define environment variables that will be available at build time
      'process.env.BACKEND_URL': JSON.stringify(
        process.env.BACKEND_URL || 'http://localhost:8080'
      ),
      'import.meta.env.BACKEND_URL': JSON.stringify(
        process.env.BACKEND_URL || 'http://localhost:8080'
      ),
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'import.meta.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.POLLING_INTERVAL': JSON.stringify(
        process.env.POLLING_INTERVAL || '5000'
      ),
      'import.meta.env.POLLING_INTERVAL': JSON.stringify(
        process.env.POLLING_INTERVAL || '5000'
      ),
    },
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          tailwindcssPostcss,
        ],
      },
    },
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
});
