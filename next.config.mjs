/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ukcumkp5whcfmjcn.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default config;
