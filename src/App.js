import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Cookie from "js-cookie";

import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Transverse/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faEye,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faTimes, faEye, faCaretLeft, faCaretRight, faCaretDown);

function App() {
  const [search, setSearch] = useState({
    keyWord: "",
    priceMin: "",
    priceMax: "",
    sort: "",
  });
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      Cookie.set("userToken", tokenToSet, { expires: 1 });
      setToken(tokenToSet);
    } else {
      Cookie.remove("userToken");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        setUser={setUser}
        token={token}
        search={search}
        setSearch={setSearch}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home search={search} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
