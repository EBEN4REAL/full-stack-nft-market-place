"use client"

import { PropsWithChildren, ReactNode } from 'react';
import { useCompliance } from '@/hooks/useCompliance';

interface Props extends PropsWithChildren {
  address: string | undefined;
  fallback?: ReactNode;
  loader?: ReactNode;
}

export function ComplianceGate({
  address,
  children,
  fallback = <p className="text-red-500 text-center">Wallet not approved.</p>,
  loader = <p className='text-center'>Checking compliance…</p>,
}: Props) {
  const { data, isLoading, error } = useCompliance(address);

  if (!address) return <p className='text-center mt-10'>Please connect your wallet.</p>;
  if (isLoading) return <>{loader}</>;
  if (error) return <p className="text-red-500">{(error as Error).message}</p>;

  return data?.isApproved ? <>{children}</> : <>{fallback}</>;
}
