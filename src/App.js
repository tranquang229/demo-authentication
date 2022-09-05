import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { GoogleLogin, GoogleLogout } from "react-google-login";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    setLoginStatus(true);
  };
  const logout = () => {
    console.log("logout");
    setLoginStatus(false);
  };
  const clientId =
    "400455690148-c2di9culb9l4i9b8i1nb8iponphdep4v.apps.googleusercontent.com";
  return (
    <div className="App">
      <h1>Login with Google 3</h1>
      {!loginStatus && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login new 3"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
      {loginStatus && (
        <div>
          <h2>Welcome {name}</h2>
          <h2>Email: {email}</h2>
          <img src={url} alt={name} />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      )}
    </div>
  );
}

export default App;
