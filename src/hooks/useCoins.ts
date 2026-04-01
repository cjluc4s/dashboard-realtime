import { useQuery } from "@tanstack/react-query";
import { getTopCoins } from "../api/coingecko";
import type { Coin } from "../types/coin";

export const useCoins = () => {
  const { data, isLoading } = useQuery<Coin[]>({
    queryKey: ["coins"],
    queryFn: getTopCoins,
    refetchInterval: 10000, // realtime automático
  });

  return {
    coins: data || [],
    loading: isLoading,
  };
};