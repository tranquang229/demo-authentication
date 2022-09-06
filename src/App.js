import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios({
        method: "post",
        url: `https://localhost:5002/api/Auth/google/login`,
        data: {
          Code: codeResponse.code,
          Type:1
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
    flow: "auth-code",
  });

  const responseFacebook = (response) => {
    debugger;
    console.log(response);

    axios({
      method: "post",
      url: `https://localhost:5002/api/Auth/facebook/login`,
      data: {
        AccessToken: response.accessToken,
        FacebookId: response.id,
        Type:1
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => login()}>Login with google</button>

        <FacebookLogin
          // appId="1444264146087502" //tranquang229
          appId="557517852817093" //quangtv
          autoLoad={false}
          // fields="name,email,picture"
          scope="public_profile,email"
          callback={responseFacebook}
          redirectUri="http://localhost:3000/"
        />
      </header>
    </div>
  );
}

export default App;
