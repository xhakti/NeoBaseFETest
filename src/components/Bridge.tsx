import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther, encodePacked, getAddress } from "viem";

import { OMNIContractAddress, OFTContractABI } from "@/contract/OFTABI";

const Bridge = () => {
  const [selectedToken, setSelectedToken] = useState("");
  const [fromAmount, setFromAmount] = useState("0");
  const [toAmount, setToAmount] = useState("0");
  const { isConnected: isWalletConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(value);
  };

  const handleBridge = async () => {
    if (!address) return;
    setIsLoading(true);

    try {
      const amountInWei = parseEther(fromAmount);

      const toAddressBytes32 = encodePacked(
        ["address"],
        [getAddress(address)]
      ).padEnd(66, "0");

      const callParams = {
        refundAddress: address,
        zroPaymentAddress: "0x0000000000000000000000000000000000000000",
        adapterParams: "0x",
      };

      // Send the transaction
      await writeContractAsync({
        address: OMNIContractAddress,
        abi: OFTContractABI,
        functionName: "sendFrom",
        args: [address, 42161, toAddressBytes32, amountInWei, callParams],
        value: parseEther("0.01"),
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Bridge failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 bg-black glow rounded-[40px] ">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Bridge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Select
            value={selectedToken}
            onValueChange={(value) => setSelectedToken(value)}
          >
            <SelectTrigger className="w-fit bg-[#171717] text-white border-gray-700">
              <SelectValue placeholder="Select Token" className="px-1" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] text-white">
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
            </SelectContent>
          </Select>

          <div className="gradient-border">
            <Card className="border-0 bg-[#171717]">
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">From</span>
                  <span className="text-white">Polygon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                    className="bg-transparent text-white text-2xl border-0 focus-visible:ring-0"
                    placeholder="0"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-blue-600 text-white"
                  >
                    MAX
                  </Button>
                </div>
                <div className="text-gray-400 mt-2">Balance: 0</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center -my-3 z-10 relative">
            {/* <ArrowDownIcon className="h-6 w-6 text-white" /> */}
            <Image
              src="/assets/icons/arrowCircleDown.svg"
              alt="arrow-down"
              width={24}
              height={24}
            />
          </div>

          <div className="gradient-border">
            <Card className="border-0 bg-[#171717]">
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">To</span>
                  <span className="text-white">Arbitrum</span>
                </div>
                <Input
                  type="number"
                  value={toAmount}
                  readOnly
                  className="bg-transparent text-white text-2xl border-0 focus-visible:ring-0"
                  placeholder="0"
                />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleBridge}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full ${
              !isWalletConnected ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            variant={"gradient2"}
            disabled={!address}
          >
            {isLoading
              ? "Processing..."
              : isWalletConnected
              ? "Transfer"
              : "Connect Wallet"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bridge;
