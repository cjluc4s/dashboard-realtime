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
        flexDirection: "column",
        gap: "10px",
        padding: "18px",
        borderRadius: "16px",
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        boxShadow: isSelected
          ? "0 0 0 2px #3b82f6, 0 10px 25px rgba(0,0,0,0.5)"
          : "0 8px 20px rgba(0,0,0,0.4)",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: isSelected ? "scale(1.04)" : "scale(1)",
      }}
    >
      {/* FAVORITO */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onFavorite?.();
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          fontSize: "18px",
        }}
      >
        {isFavorite ? "⭐" : "☆"}
      </div>

      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={coin.image} width={28} />
        <span style={{ fontWeight: 600 }}>{coin.name}</span>
      </div>

      {/* PREÇO */}
      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        ${coin.current_price.toLocaleString()}
      </div>

      {/* VARIAÇÃO */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: isPositive ? "#22c55e" : "#ef4444",
        }}
      >
        {isPositive ? "▲" : "▼"}{" "}
        {coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    </div>
  );
};