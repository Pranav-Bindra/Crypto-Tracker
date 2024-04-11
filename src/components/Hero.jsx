import axios from "axios";
import { CoinList } from "../api/routes";
import { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";

export const Hero = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);

  const config = {
    headers: {
      Authorization: `	
      44d54854-8e9c-4b49-88d0-3c6bc06179c8`, // Assuming it's a Bearer token, adjust accordingly if not
    },
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(
      "https://api.mobula.io/api/1/all?fields=id%2Csymbol%2Cname%2Clogo%2Cprice%2Cprice_change_24h%2Cmarket_cap",
      config
    );

    var res = data.data.sort((a, b) => b.price_change_24h - a.price_change_24h);
    const trendingextr = res.slice(0, 10);
    setTrending(trendingextr);
    console.log(trending);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const items = trending.map((coin) => {
    let profit = coin.price_change_24h >= 0;

    return (
      <Link to={`/coin/${coin.name}`}>
        <img
          className="h-32 w-32 flex justify-center"
          src={coin?.logo}
          alt={coin.name}
          style={{ marginBottom: 10 }}
        ></img>
        <div>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_24h?.toFixed(2)}%
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.price.toFixed(2))}
        </div>
      </Link>
    );
  });

  return (
    <div className="h-1/2 flex justify-center items-center mr-32">
      <AliceCarousel
        mouseTracking
        autoPlay
        autoWidth
        autoPlayInterval={1000}
        animationDuration={1500}
        infinite
        touchTracking={false}
        disableButtonsControls
        disableDotsControls
        items={items}
      />
    </div>
  );
};
