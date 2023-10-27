import { useState } from "react";
import SearchContext from "./search-context";

const SearchProvider = (props) => {
  const [searchKeys, setSearchKeys] = useState({});
  const [user, setUser] = useState(
    localStorage.getItem("USER") &&
      JSON.parse(localStorage.getItem("USER")).user
  );
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("USER") ? true : false
  );

  const onGetSearchKeys = (keys) => {
    setSearchKeys(keys);
  };

  const onCreateUser = (user) => {
    setUser(user);
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const search_context = {
    searchKeys: searchKeys,
    onGetSearchKeys,
    onCreateUser,
    user: user,
    isLogin,
  };

  return (
    <SearchContext.Provider value={search_context}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
