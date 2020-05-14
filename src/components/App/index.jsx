import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import JoinChat from "../JoinChat";
import MainPage from "../MainPage";
import css from "./style.module.css";
import Invite from "../Invite";
import { checkConnection } from "../../redux/reducers/user";
import { getIsConnected } from "../../redux/reducers/userSelectors";
import Preloader from "../Preloader";

function App() {
  const dispatch = useDispatch();
  const isConnected = useSelector(getIsConnected);

  if (!isConnected) {
    dispatch(checkConnection());
    console.log("ОБНОВИЛСЯ ЭПП");
  }

  return (
    <div className={css.appWrapper}>
      {!isConnected && <Preloader />}
      {isConnected && (
        <div className={css.app}>
          <Route path="/" render={() => <MainPage />} />
          <Route path="/invitation/:roomId" render={() => <Invite />} />
          <Route path="/login" render={() => <JoinChat />} />
        </div>
      )}
    </div>
  );
}

export default App;
