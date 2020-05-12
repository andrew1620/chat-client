import React from "react";
import { Route, Switch } from "react-router-dom";

import JoinChat from "../JoinChat";
import MainPage from "../MainPage";
import css from "./style.module.css";

function App() {
  return (
    <div className={css.app}>
      <div>
        <Route path="/" render={() => <MainPage />} />
        <Route path="/login" render={() => <JoinChat />} />
      </div>
    </div>
  );
}

export default App;
