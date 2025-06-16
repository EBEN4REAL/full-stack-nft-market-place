import { useQuery } from '@tanstack/react-query';
import { postJSON } from '@/lib/http';

export interface ComplianceResponse {
    success: boolean
    isApproved: boolean
    data: Data
  }
  
  export interface Data {
    result: string
    decision: Decision
    id: string
    address: string
    chain: string
    details: any[]
  }
  
  export interface Decision {
    screeningDate: string
  }

export function useCompliance(address?: string) {
  return useQuery({
    queryKey: ['compliance', address],
    enabled: !!address,
    queryFn: () =>
      postJSON<ComplianceResponse>('/api/compliance', { address }),
    staleTime: 60_000,
  });
}
