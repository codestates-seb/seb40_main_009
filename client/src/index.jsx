import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/common.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import axios from 'axios';


axios.defaults.baseURL = 'https://18d0-203-130-71-252.jp.ngrok.io/';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
