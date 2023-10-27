import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";

import SignUp from "./pages/account/SignUp";
import Login from "./pages/account/Login";
import SearchProvider from "./context/search-provider";
import Transactions from "./pages/transaction/Transactions";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:hotelID" element={<Detail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transactions/:username" element={<Transactions />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
