import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pyp-bucket.s3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pyp-bucket.s3.us-east-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);