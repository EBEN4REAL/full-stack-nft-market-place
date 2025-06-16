"use client";

import { useAccount } from "wagmi";
import RecentlyListedNFTs from "@/components/RecentlyListed";
import { ComplianceGate } from "@/components/ComplianceGate";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <main>
      {!isConnected ? (
        <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
          Please connect a wallet
        </div>
      ) : (
        /* only render NFTs when the connected wallet is APPROVED amd passes compliance test */
        <ComplianceGate
          address={address}
          fallback={
            <p className="text-red-500 text-center">
              This wallet isn’t approved for trading on this marketplace.
            </p>
          }
        >
          <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
            <RecentlyListedNFTs />
          </div>
        </ComplianceGate>
      )}
    </main>
  );
}

