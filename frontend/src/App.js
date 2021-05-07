import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import SongPage from './components/SplashPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded}
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <SongPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
