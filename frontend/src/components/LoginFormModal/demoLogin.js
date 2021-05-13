import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function DemoLogin() {
  const dispatch = useDispatch();


  const demoSubmit = () => {
    return dispatch(sessionActions.login({ credential:'test1', password:'password' })).catch(
    );
  };

  return (
    <>
      <button id='demoSplash' onClick={() => demoSubmit()}>Demo Login</button>
    </>
  );

}

export default DemoLogin;
