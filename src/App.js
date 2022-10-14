import React,{Component,Suspense} from 'react';
import { connect } from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';

const Login = React.lazy(() => import("./pages/LogIn"));
const Register = React.lazy(() => import("./pages/Register"));
const OTPVerify = React.lazy(() => import("./pages/OtpVerify"));

class App extends Component{
  displayName = "Search Customer";

  render(){
    const height = window.innerHeight;
    return(
    <Suspense fallback={
     <div></div>
    }>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/OTPVerify" component={OTPVerify}/>
        <Redirect to="/"/>
      </Switch>
    </Suspense>
    )
  }
}

export default connect(null,null)(App);