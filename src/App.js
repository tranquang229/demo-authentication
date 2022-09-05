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
  return (
    <div className="App">
      <h1>Login with Google 3</h1>
      {!loginStatus && (
        <GoogleLogin
          clientId="149006969627-t1n833e914bhjfmd9vt3tiq3fa9vhghr.apps.googleusercontent.com"
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
            clientId="149006969627-t1n833e914bhjfmd9vt3tiq3fa9vhghr.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      )}
    </div>
  );
}

export default App;
