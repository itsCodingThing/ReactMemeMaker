import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "w8iwhq6lm3nwo2bg.public.blob.vercel-storage.com",
			},
		],
	},
};

export default nextConfig;
