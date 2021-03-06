import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };



  return (
    <div className="logInFormWrapper">
      <span className="logInBanner">Log In</span>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              Placeholder= "Enter Username || Email"
            />
          </label>
        </div>
        <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            Placeholder= "Enter Password"
          />
        </label>
        </div>
        <div>
        <button className='buttonLogIn' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
