import {
  AreaChart,
  Area,
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

  const isPositive = data[data.length - 1].price >= data[0].price;

  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" hide />

          <YAxis
            domain={[
              (dataMin: number) => dataMin * 0.999,
              (dataMax: number) => dataMax * 1.001,
            ]}
            hide
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              color: "#fff",
            }}
            labelStyle={{ color: "#94a3b8" }}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={false}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};