import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, mainnet, polygon, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [
    mainnet,
    polygon,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
