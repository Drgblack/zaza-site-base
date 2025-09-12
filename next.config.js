/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true }
    ];
  },
  // ESLint enabled, TypeScript temporarily allowed for existing baseline issues
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;

