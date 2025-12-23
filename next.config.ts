import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "avatar.iran.liara.run",
      // },
    ],
  },
};

export default nextConfig;
