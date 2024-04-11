import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";
import axios from "axios";

export const CoinPage = () => {
  const { name } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(CryptoContext);

  const config = {
    headers: {
      Authorization: `	
      44d54854-8e9c-4b49-88d0-3c6bc06179c8`, // Assuming it's a Bearer token, adjust accordingly if not
    },
  };

  const fetchCoin = async () => {
    const { data } = await axios.get(
      `https://api.mobula.io/api/1/market/data?asset=${name}`,
      config
    );
    setCoin(data.data);
  };

  function formatNumber(number) {
    if (number === null || number === undefined) return "";

    const formattedNumber = Number(number).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
    return formattedNumber;
  }

  function formatCurrency(currency) {
    if (currency === null || currency === undefined) return "";

    const million = 1000000;
    const billion = 1000000000;

    if (Math.abs(currency) >= billion) {
      return `${(currency / billion).toFixed(2)}B`;
    } else if (Math.abs(currency) >= million) {
      return `${(currency / million).toFixed(2)}M`;
    } else {
      return formatNumber(currency);
    }
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className="flex flex-col items-center md:flex-row mt-24">
      <div className="flex flex-col items-center mt-6 border-r-2 border-gray-600 w-screen md:w-2/6">
        <img
          className="h-48"
          src={coin?.logo}
          alt={coin?.name}
          style={{ marginBottom: 20 }}
        ></img>
        <div className="text-4xl font-bold mb-20">{coin?.name}</div>
      </div>
      <div className="ml-20 grid grid-cols-12 gap-1">
        <div className="col-span-3 pb-20">
          <div className="text-lg font-semibold">Symbol:</div>
          <div className="text-xl">{coin?.symbol}</div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Name:</div>
          <div>{coin?.name}</div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Market Cap:</div>
          <div>{formatNumber(coin?.market_cap)}</div>
        </div>

        <div>
          <div className="text-lg font-semibold">Market Cap:</div>
          <div>{formatNumber(coin?.market_cap)}</div>
        </div>

        <div className="col-span-3 pb-20">
          <div className="text-lg font-semibold">Price:</div>
          <div
            className={`text-xl ${
              coin?.price >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatCurrency(coin?.price)}
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Price Change 1h:</div>
          <div
            className={`text-xl ${
              coin?.price_change_1h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatNumber(coin?.price_change_1h)}
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Price Change 1m:</div>
          <div
            className={`text-xl ${
              coin?.price_change_1m >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatNumber(coin?.price_change_1m)}
          </div>
        </div>

        <div className="col-span-3 pb-20">
          <div className="text-lg font-semibold">Price Change 1y:</div>
          <div
            className={`text-xl ${
              coin?.price_change_1y >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatNumber(coin?.price_change_1y)}
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Price Change 7d:</div>
          <div
            className={`text-xl ${
              coin?.price_change_7d >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatNumber(coin?.price_change_7d)}
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Price Change 24h:</div>
          <div
            className={`text-xl ${
              coin?.price_change_24h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatNumber(coin?.price_change_24h)}
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Volume:</div>
          <div>{formatNumber(coin?.volume)}</div>
        </div>

        <div className="col-span-3">
          <div className="text-lg font-semibold">Volume 7d:</div>
          <div>{formatNumber(coin?.volume_7d)}</div>
        </div>
      </div>
    </div>
  );
};
