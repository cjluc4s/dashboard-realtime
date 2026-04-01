import { useState } from "react";
import { useCoins } from "./hooks/useCoins";
import { useFavorites } from "./hooks/useFavorites";
import { CoinCard } from "./components/CoinCard";
import { PriceChart } from "./components/PriceChart";

function App() {
  const { coins, loading } = useCoins();
  const { favorites, toggleFavorite } = useFavorites();

  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [search, setSearch] = useState("");

  if (loading) return <p>Carregando...</p>;

  // 🔍 filtro
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard Realtime</h1>

      {/* GRÁFICO */}
      <div style={{ marginBottom: "30px" }}>
        <h2>{selectedCoin.toUpperCase()} (24h)</h2>
        <PriceChart coinId={selectedCoin} />
      </div>

      {/* 🔍 BUSCA */}
      <input
        type="text"
        placeholder="Buscar moeda..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          backgroundColor: "#1e293b",
          color: "#fff",
        }}
      />

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredCoins.map((coin) => (
          <CoinCard
            key={coin.id}
            coin={coin}
            onClick={() => setSelectedCoin(coin.id)}
            isSelected={coin.id === selectedCoin}
            isFavorite={favorites.includes(coin.id)}
            onFavorite={() => toggleFavorite(coin.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;