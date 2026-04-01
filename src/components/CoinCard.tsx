import type { Coin } from "../types/coin";

interface Props {
  coin: Coin;
  onClick?: () => void;
  isSelected?: boolean;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

export const CoinCard = ({
  coin,
  onClick,
  isSelected,
  isFavorite,
  onFavorite,
}: Props) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "15px",
        borderRadius: "12px",
        backgroundColor: "#1e293b",
        boxShadow: isSelected
          ? "0 0 0 2px #3b82f6, 0 6px 20px rgba(0,0,0,0.4)"
          : "0 4px 10px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: isSelected ? "scale(1.03)" : "scale(1)",
      }}
    >
      {/* ⭐ FAVORITO */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // evita trocar gráfico
          onFavorite?.();
        }}
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "⭐" : "☆"}
      </div>

      <img src={coin.image} width={32} />

      <div style={{ flex: 1 }}>
        <strong>{coin.name}</strong>

        <p style={{ margin: 0 }}>
          ${coin.current_price.toLocaleString()}
        </p>

        <p
          style={{
            margin: 0,
            color: isPositive ? "#22c55e" : "#ef4444",
          }}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};