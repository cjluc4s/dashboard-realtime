import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useCoinHistory } from "../hooks/useCoinHistory";

interface Props {
  coinId: string;
}

export const PriceChart = ({ coinId }: Props) => {
  const { data, loading } = useCoinHistory(coinId);

  // 🧊 SKELETON
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: 300,
          borderRadius: "12px",
          background:
            "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)",
          backgroundSize: "200% 100%",
          animation: "loading 1.5s infinite",
        }}
      />
    );
  }

  if (!data || data.length === 0) {
    return <p>Sem dados disponíveis</p>;
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />

          <YAxis
            domain={[
              (dataMin: number) => dataMin * 0.999,
              (dataMax: number) => dataMax * 1.001,
            ]}
            hide
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};