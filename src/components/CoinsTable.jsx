import { useEffect, useState } from "react";
import { useContext } from "react";
import { CryptoContext } from "../CryptoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = useContext(CryptoContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const config = {
    headers: {
      Authorization: "Bearer 44d54854-8e9c-4b49-88d0-3c6bc06179c8", // Assuming it's a Bearer token, adjust accordingly if not
    },
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://api.mobula.io/api/1/all?fields=id%2Csymbol%2Cname%2Clogo%2Cprice%2Cprice_change_24h%2Cmarket_cap",
      config
    );

    var res = data.data.sort((a, b) => b.market_cap - a.market_cap);
    const trendingextr = res.slice(0, 100);
    setCoins(trendingextr);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="flex justify-center w-10 h-10 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div role="status">
            <svg
              className="w-8 h-8 text-yellow-500 animate-spin dark:text-gray-600 fill-yellow-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black-200">
            <thead className="bg-yellow-500">
              <tr>
                <th
                  className="pl-16 py-3 text-left text-xs font-bold text-gray-700 uppercase"
                  scope="col"
                >
                  Coin
                </th>
                <th
                  className="pr-6 py-3 text-xs font-bold text-gray-700 uppercase"
                  scope="col"
                >
                  Price
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold text-gray-700 uppercase"
                  scope="col"
                >
                  24h Change
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold text-gray-700 uppercase"
                  scope="col"
                >
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {handleSearch().map((row) => {
                let profit = row.price_change_24h >= 0;

                return (
                  <tr
                    onClick={() => navigate(`/coin/${row.name}`)}
                    className="cursor-pointer hover:bg-gray-100"
                    key={row.id}
                  >
                    <td className="px-6 py-4 text-black">
                      <div className="flex items-center">
                        <img
                          src={row?.logo}
                          alt={row.name}
                          className="w-10 h-10 mr-2"
                        />
                        <div className="flex flex-col">
                          <span className="uppercase text-xl">
                            {row.symbol}
                          </span>
                          <span className="text-xs text-gray-500">
                            {row.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-black">
                      {symbol} {numberWithCommas(row?.price.toFixed(2))}
                    </td>
                    <td className="px-6 py-4 text-black">
                      <span
                        className={profit ? "text-green-500" : "text-red-500"}
                      >
                        {profit ? "+" : "-"}
                        {Math.abs(row.price_change_24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black">
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap).toString().slice(0, -6)}
                      M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoinsTable;
