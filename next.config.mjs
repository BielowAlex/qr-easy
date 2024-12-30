/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'restaumatic-blog-uploads.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
