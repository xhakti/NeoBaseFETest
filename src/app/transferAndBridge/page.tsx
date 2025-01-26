import TransactionHistory from "@/components/TransactionHistory";
import TransferAndBridge from "@/components/TransferAndBridge";

const TransferAndBridgePage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen mt-10">
      <TransferAndBridge />
      <TransactionHistory />
    </div>
  );
};

export default TransferAndBridgePage;
