import { createContext, useContext, useEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [curr, setCurr] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (curr === "USD") setSymbol("$");
    else if (curr === "CAD") setSymbol("CA$");
  }, [curr]);

  return (
    <CryptoContext.Provider value={{ curr, setCurr, symbol }}>
      {children}
    </CryptoContext.Provider>
  );
};
