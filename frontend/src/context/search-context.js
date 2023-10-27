import React from "react";

const SearchContext = React.createContext({
  searchKeys: {},
  onGetSearchKeys: () => {},
  user: {},
  onCreateUser: () => {},
  isLogin: false,
});

export default SearchContext;
