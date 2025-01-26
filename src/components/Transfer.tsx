import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount, useWriteContract } from "wagmi";
import { OMNIContractAddress, OFTContractABI } from "@/contract/OFTABI";
import { parseEther } from "viem";

const Transfer = () => {
  const [amount, setAmount] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isConnected: isWalletConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const handleTransfer = async () => {
    if (!address || !amount || !recipientAddress) return;
    setIsLoading(true);

    try {
      const amountInWei = parseEther(amount);

      // Then do the transfer
      await writeContractAsync({
        address: OMNIContractAddress,
        abi: OFTContractABI,
        functionName: "transfer",
        args: [recipientAddress, amountInWei],
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  return (
    <div className="p-4 glow rounded-[40px] px-5 py-10">
      <h2 className="text-sm font-semibold text-white mb-4">Transfer</h2>
      <div className="space-y-4">
        <div className="gradient-border">
          <Card className="border-0 bg-[#171717]">
            <CardContent className="p-4">
              <span className="text-gray-400 text-xs block mb-1">
                Total Amount to transfer
              </span>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-white border-0 focus-visible:ring-0 p-0 h-auto w-full"
                placeholder="0"
                style={{ fontSize: "2rem", lineHeight: "1" }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="gradient-border">
          <Card className="border-0 bg-[#171717]">
            <CardContent className="p-4">
              <span className="text-gray-400 text-xs block mb-1">
                User Address
              </span>
              <Input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="bg-transparent text-white border-0 focus-visible:ring-0 p-0 h-auto w-full"
                placeholder="0"
                style={{ fontSize: "2rem", lineHeight: "1" }}
              />
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleTransfer}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full ${
            !isWalletConnected ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          variant={"gradient2"}
          disabled={!address || !amount || !recipientAddress || isLoading}
        >
          {isLoading
            ? "Processing..."
            : isWalletConnected
            ? "Transfer"
            : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
};

export default Transfer;
