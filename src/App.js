import React from 'react'
import Home from './Home.js'
import './Home.css'
import SignUp from './SignUp'
import User from './User'

import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import cookies from 'react-cookies'
function App() {
  console.log(cookies.load('csrftoken'))
  return (
    <Router>
      <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        <Switch>
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/userPage" component={User}/>
          <Route exact path="/" component={Home}/>
        </Switch>
    </Router>
  );
}
export default App;
