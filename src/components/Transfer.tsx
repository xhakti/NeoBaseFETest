import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
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
                type="number"
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-transparent text-white border-0 focus-visible:ring-0 p-0 h-auto w-full"
                placeholder="0"
                style={{ fontSize: "2rem", lineHeight: "1" }}
              />
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleConnectWallet}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full"
          variant={"gradient2"}
        >
          {isWalletConnected ? "Transfer" : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
};

export default Transfer;
