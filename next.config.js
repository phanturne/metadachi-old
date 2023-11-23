const mode = process.env.NEXT_PUBLIC_BUILD_MODE ?? 'standalone';
console.log('[Metadachi] Build Mode:', mode);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: mode,
  images: {
    unoptimized: mode === 'export',
  },
};

module.exports = nextConfig;
