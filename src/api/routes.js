export const CoinList = () => {
    `https://api.mobula.io/api/1/all?fields=id%2Csymbol%2Cname%2Clogo%2Cprice%2Cprice_change_24h%2Cmarket_cap`
}

export const SingleCoin = (asset) => {
    `https://api.mobula.io/api/1/market/data?asset=${asset}`
}

