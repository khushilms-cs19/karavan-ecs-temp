import React from 'react';
import ReactDOM from 'react-dom';
import "@patternfly/patternfly/patternfly.css";
import './index.css';
import {Main} from "./Main";
import { Mid } from '@mid/sdk';
import LoginWrapper from './components/LoginWrapper';
import LoadingPage from './layout/Loading';

const mid = new Mid({
    redirectUrl: 'http://localhost:3000/main',
    logoutRedirectUrl: 'http://localhost:3000',
    loginInfo: {
      appId: '6bfc9a8f-a39e-49b2-86f8-5bb6923eb2fc',
      oidcConfigUrl: 'https://auth.int.mckinsey.id/auth/realms/r/.well-known/openid-configuration', 
      authDriver: 'mid',
    }, 
    async landingFn(): Promise<void> {
      
    },
  })

ReactDOM.render(
  <LoginWrapper mid={mid} loadingNode={(props) => <LoadingPage {...props} />}>
         <Main/>
  </LoginWrapper>,
  document.getElementById('root')
);