import './App.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';

function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios({
        method: 'post',
        url: `https://localhost:5002/api/Auth/google/login`,
        data: {
          Code: codeResponse.code,
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
    flow: 'auth-code',
  });

  const responseFacebook = (response) => {
    console.log(response);

    axios({
      method: 'post',
      url: `https://localhost:5002/api/Auth/facebook/login`,
      data: {
        AccessToken: response.accessToken,
        Id: response.id,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => login()}>Login with google2</button>

        <FacebookLogin
          appId='1444264146087502' //tranquang229
          // appId='557517852817093' //quangtv
          autoLoad={false}
          fields='name,email,picture'
          scope='public_profile'
          callback={responseFacebook}
          redirectUri='http://localhost:3000'
        />
      </header>
    </div>
  );
}

export default App;
