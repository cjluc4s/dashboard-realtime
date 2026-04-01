import { useQuery } from "@tanstack/react-query";
import { getCoinHistory } from "../api/coingeckoHistory";

interface Point {
  time: string;
  price: number;
}

export const useCoinHistory = (coinId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["history", coinId],
    queryFn: async () => {
      const prices = await getCoinHistory(coinId);

      return prices.map((item: any) => ({
        time: new Date(item[0]).toLocaleTimeString(),
        price: item[1],
      })) as Point[];
    },
    refetchInterval: 15000,
  });

  return {
    data: data || [],
    loading: isLoading,
  };
};