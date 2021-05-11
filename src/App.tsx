import React from 'react';
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import RegisterHospitelPage from './pages/RegisterHospitel/RegisterHospitelPage'
import './App.css'

// const RegisterHospitel = lazy(() => import("./pages/RegisterHospitel/RegisterHospitelPage"));

function App(): JSX.Element {
  return (<BrowserRouter>
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={RegisterHospitelPage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Suspense>
  </BrowserRouter>)
}

export default App;
