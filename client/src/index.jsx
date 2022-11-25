import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/common.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import axios from 'axios';

axios.defaults.baseURL = 'https://074a-14-52-189-10.jp.ngrok.io/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
