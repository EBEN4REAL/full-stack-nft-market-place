import { fetchNFTs } from "@/components/RecentlyListed"
import { NFTQueryResponse } from "@/types/NFT"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export function useRecentlyListedNFTs() {
    const { data, isLoading, error } = useQuery<NFTQueryResponse>({
      queryKey: ['recentNfts'],
      queryFn: fetchNFTs,
    })
  
    const nfts = useMemo(() => {
      if (!data) return []
      const listedNfts = data.data.allItemListeds.nodes || []
      const canceledNfts = data.data.allItemCanceleds.nodes || []
      const boughtNfts = data.data.allItemBoughts.nodes || []
  
      // Filter out canceled and bought NFTs
      return listedNfts.filter(listed => 
        !canceledNfts.some(canceled => 
          canceled.nftAddress === listed.nftAddress && canceled.tokenId === listed.tokenId
        ) &&
        !boughtNfts.some(bought => 
          bought.nftAddress === listed.nftAddress && bought.tokenId === listed.tokenId
        )
      )
    }, [data])
  
    return { nfts, isLoading, error }
  }