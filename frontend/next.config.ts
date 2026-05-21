import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                port: "",
                // Match everything from the root directory down
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
