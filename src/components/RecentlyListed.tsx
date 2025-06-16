import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import NFTBox from "./NFTBox"
import Link from "next/link"
import { NFTQueryResponse } from "@/types/NFT"
import { useRecentlyListedNFTs } from "@/hooks/useRecentlyListedNFTs"

const GET_RECENT_NFTS = `
  query AllItemListeds {
    allItemListeds(first: 20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
      nodes {
        seller
        nftAddress
        tokenId
        contractAddress
        txHash,
        blockNumber,
        price
      }
    }
    allItemCanceleds {
      nodes {
        nftAddress
        tokenId
      }
    }
    allItemBoughts {
      nodes {
        nftAddress
        tokenId
      }
    }
  }
`

export async function fetchNFTs(): Promise<NFTQueryResponse> {
    const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: GET_RECENT_NFTS,
        }),
    })
    return response.json()
}

export default function RecentlyListedNFTs() {
    const { nfts, isLoading, error } = useRecentlyListedNFTs()
    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
                <Link
                    href="/list-nft"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    List Your NFT
                </Link>
            </div>
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {nfts.map(nft => (
                    <Link
                        key={`${nft.nftAddress}-${nft.tokenId}`}
                        href={`/buy-nft/${nft.nftAddress}/${nft.tokenId}`}
                        className="block transform transition hover:scale-105"
                    >
                        <NFTBox
                            key={`${nft.nftAddress}-${nft.tokenId}`}
                            tokenId={nft.tokenId}
                            contractAddress={nft.nftAddress}
                            price={nft.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}
