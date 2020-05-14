import React from "react";
import { Route } from "react-router-dom";

import JoinChat from "../JoinChat";
import MainPage from "../MainPage";
import css from "./style.module.css";
import Invite from "../MainPage/Invite";

function App() {
  return (
    <div className={css.app}>
      <div>
        <Route path="/" render={() => <MainPage />} />
        <Route path="/invitation/:roomId" render={() => <Invite />} />
        <Route path="/login" render={() => <JoinChat />} />
      </div>
    </div>
  );
}

export default App;
