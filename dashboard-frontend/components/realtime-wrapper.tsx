"use client";

import { useRealtimeRefresh } from '@/hooks/useRealtimeRefresh';

interface RealtimeWrapperProps {
  children: React.ReactNode;
  onRefresh?: () => void;
}

export function RealtimeWrapper({ children, onRefresh }: RealtimeWrapperProps) {
  useRealtimeRefresh(onRefresh);
  
  return <>{children}</>;
}