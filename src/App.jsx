import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { CoinPage } from "./pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black text-white min-h-screen">
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/coin/:name" Component={CoinPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
