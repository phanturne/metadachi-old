const mode = process.env.BUILD_MODE ?? 'standalone';
console.log('[Metadachi] Build Mode:', mode);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: mode,
  images: {
    unoptimized: mode === 'export',
  },
};

module.exports = nextConfig;
