import './assets/fonts/notosans-en.css';
import './assets/fonts/notosans-th.css';
import './assets/fonts/stylesheet.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { ThemeProvider } from "styled-components";
import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'
import axios from './client/axios'
import { LiffProvider } from 'react-liff-v2'
import config from './config/config';

console.log("config: ", config)

const swrConfig = {
  fetcher: (url: string) => axios.get(url).then((res) => res.data),
  shouldRetryOnError: false,
}

const stubEnabled = import.meta.env.MODE !== 'production' 

ReactDOM.render(
  <React.StrictMode>
    <LiffProvider liffId={`${config.LIFF_ID}`} stubEnabled={stubEnabled}>
      <SWRConfig value={swrConfig}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </SWRConfig>
    </LiffProvider>
  </React.StrictMode>
  ,document.getElementById('root')
);
