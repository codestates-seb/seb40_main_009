import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { RecoilRoot } from 'recoil';

import './style/common.css';

import App from './App';

axios.defaults.baseURL = 'https://63b5-203-130-71-252.jp.ngrok.io';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
