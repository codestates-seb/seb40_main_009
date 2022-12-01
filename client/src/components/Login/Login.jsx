import axios from 'axios';

async function requestDataWithToken(setFunc, url, method, data) {
  let authorizationToken = localStorage.getItem('authorizationToken');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const access = await axios({
      //   method,
      //   url,
      //   data,
      headers: { authorizationToken },
    });
    console.log('첫요청 성공', access);
    if (setFunc) setFunc(access.data);
  } catch (err) {
    if (err.response.status === 401) {
      try {
        const resForToken = await axios.get(`/token`, {
          headers: { authorization: authorizationToken, refresh: refreshToken }, //refresh 토큰만 보내면 새로 발급 받은 autho 토큰은 어떻게 저장?
        });
        localStorage.setItem(
          'authorizationToken',
          resForToken.headers.authorization
        );
        authorizationToken = localStorage.getItem('authorizationToken');
        const reRes = await axios({
          //   method,
          //   url,
          //   data,
          headers: { authorization: authorizationToken },
        });
        console.log('재요청 성공', reRes);
        if (setFunc) setFunc(reRes.data);
      } catch (err) {
        console.log('재요청 실패', err);
      }
    }
    console.log('첫요청 실패', err);
  }
}

export default requestDataWithToken;
