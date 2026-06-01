/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.jac.com.cn' },
      { protocol: 'https', hostname: 'www.dodge.com' },
      { protocol: 'https', hostname: 'www.jeep.com' },
      { protocol: 'https', hostname: 'jacvenezuela.com' },
      { protocol: 'https', hostname: 'www.ramtrucks.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
};

export default nextConfig;
