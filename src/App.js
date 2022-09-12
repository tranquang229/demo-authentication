import './App.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import FormUpload from './FormUpload';
import FileSaver from 'file-saver';
function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios({
        method: 'post',
        url: `https://localhost:5002/api/Auth/google/login`,
        data: {
          code: codeResponse.code,
          type: 1,
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
    flow: 'auth-code',
  });

  const responseFacebook = (response) => {
    debugger;
    console.log(response);

    axios({
      method: 'post',
      url: `https://localhost:5002/api/Auth/facebook/login`,
      data: {
        AccessToken: response.accessToken,
        FacebookId: response.id,
        Type: 1,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
const handleSaveFile = ()=> {
  axios({
    method: 'get',
    url: `https://localhost:6002/api/admin/Sample/write`,
  }).then((res) => {
    FileSaver.saveAs(
      new Blob(res.data, {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'testing.xlsx'
    );
  });
}
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => login()}>Login with google</button>

        <FacebookLogin
          // appId="1444264146087502" //tranquang229
          appId='557517852817093' //quangtv
          autoLoad={false}
          // fields="name,email,picture"
          scope='public_profile,email'
          callback={responseFacebook}
          // redirectUri='https://demo-authentication.herokuapp.com/'
          // redirectUri='http://localhost:3000/'
          // redirectUri='https://6225-1-53-140-185.ap.ngrok.io'
        />
        <FormUpload/>

        <button onClick={handleSaveFile}>SaveFile</button>
      </header>
    </div>
  );
}

export default App;
