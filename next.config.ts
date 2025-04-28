import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: "/.well-known/ai-plugin.json",
				destination: "/api/ai-plugin",
			},
		];
	},
};

export default nextConfig;
