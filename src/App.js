import './App.css';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import FormUpload from './FormUpload';
import FileSaver from 'file-saver';
function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      debugger;
      axios({
        method: 'post',
        // url: `https://web-api-dev.appigv.vmo.group/api/Auth/google/login`,
        url: `https://web-api-dev.appigv.vmo.group/api/Auth/google/login`,
        // url: `http://localhost:5002/api/Auth/google/login`,
        data: {
          code: codeResponse.code,
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
    flow: 'auth-code', //implicit or auth-code
  });

  const responseFacebook = (response) => {
    debugger;
    console.log(response);

    axios({
      method: 'post',
      url: `https://localhost:5002/api/Auth/facebook/login`,
      data: {
        accessToken: response.accessToken,
        facebookId: response.id,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
  const handleSaveFile = () => {
    axios({
      method: 'get',
      url: `http://localhost:6002/api/Course/export?Keyword=&PageNum=1&PageSize=20`,
    }).then((res) => {
      FileSaver.saveAs(
        new Blob(res.data, {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        'testing.xlsx'
      );
    });
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => login()}>Login with google3</button>

        <FacebookLogin
          appId='557517852817093' //quangtv
          autoLoad={false}
          fields="name,email,picture"
          scope='public_profile,email'
          callback={responseFacebook}
          // redirectUri='https://demo-authentication.herokuapp.com/'
          // redirectUri='http://localhost:3000/'
          // redirectUri='https://6225-1-53-140-185.ap.ngrok.io'
        />
        <FormUpload />
        <button onClick={handleSaveFile}>SaveFile</button>
      </header>
    </div>
  );
}

export default App;
