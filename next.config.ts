import type { NextConfig } from "next";
const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [128, 256, 384],
    qualities: [75, 85],
  },
};
export default config;
