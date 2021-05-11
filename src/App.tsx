import React from 'react';
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import './App.css'

// import RegisterHospitelPage from './pages/RegisterHospitel/RegisterHospitelPage'
const RegisterHospitel = lazy(() => import("./pages/RegisterHospitel/RegisterHospitelPage"));

function App(): JSX.Element {
  return (
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RegisterHospitel} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App;
