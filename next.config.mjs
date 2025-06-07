// next.config.js
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mjml'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['graphql'] = path.resolve(__dirname, 'node_modules/graphql');
    }
    return config;
  },
};

export default nextConfig;
