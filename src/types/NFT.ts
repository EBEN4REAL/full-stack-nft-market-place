export interface NFTItem {
    rindexerId: number
    seller: string
    nftAddress: string
    tokenId: string
    contractAddress: string
    txHash: string
    blockNumber: number
    price: string
  }
  
  export interface BoughtCancelled {
    nftAddress: string
    tokenId: string
  }
  export interface NFTQueryResponse {
    data: {
      allItemListeds: {
        nodes: NFTItem[]
      },
      allItemCanceleds: {
        nodes: NFTItem[]
      }
      allItemBoughts: {
        nodes: NFTItem[]
      }
    }
  }