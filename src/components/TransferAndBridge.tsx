"use client";

import { useState } from "react";
import Transfer from "./Transfer";
import Bridge from "./Bridge";
import { TABS } from "@/utils/enum";
import { Button } from "./ui/button";

const TransferAndBridge = () => {
  const [activeTab, setActiveTab] = useState<TABS>(TABS.Transfer);

  return (
    <div className="w-[40%] mx-auto p-4">
      {/* Tabs */}
      <div className="flex  justify-between items-center mb-4 max-w-[70%] mx-auto">
        <Button
          variant={"gradient1"}
          className="px-4 text-xs flex items-center font-bold tracking-wider"
          onClick={() => setActiveTab(TABS.Transfer)}
        >
          {activeTab === TABS.Transfer && (
            <div className="w-2 h-2 bg-white rounded-full "></div>
          )}
          TRANSFER
        </Button>

        <div className="h-[1px] flex-1 border-t border-dashed border-white"></div>

        <Button
          variant={"gradient1"}
          className="px-4 text-xs flex items-center font-bold tracking-wider"
          onClick={() => setActiveTab(TABS.Bridge)}
        >
          {activeTab === TABS.Bridge && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
          BRIDGE
        </Button>
      </div>

      {/* Content */}
      <div className="rounded-lg shadow-md">
        {activeTab === TABS.Transfer ? <Transfer /> : <Bridge />}
      </div>
    </div>
  );
};

export default TransferAndBridge;
