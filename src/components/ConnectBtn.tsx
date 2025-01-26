"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function ConnectBtn() {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  console.log(isConnected, address);

  return (
    <>
      {openConnectModal && (
        <button onClick={() => openConnectModal?.()}>Connect</button>
      )}

      {isConnected && <div>{address}</div>}
    </>
  );
}
