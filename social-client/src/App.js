import React, { useEffect, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { Navbar } from './component/navbar/Navbar';
import { useDispatch } from 'react-redux';
import { actionCreators } from './store'

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Errorpage from "./component/error/Errorpage";
import Homefeed from "./component/home/Homefeed";
import Message from "./component/messages/Message";
import Profile from "./component/profile/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import Login from './component/common/Login'
import Signup from './component/common/Signup'
import PostUpload from './component/upload-ui/PostUpload';
import CompleteProfile from './component/common/CompleteProfile';
import OtpVerifyPage from './component/common/OtpVerifyPage';
import ForgetPassword from './component/common/ForgetPassword';
import TermsandCondition from './component/common/TermsandCondition';
import UserProfile from './component/profile/UserProfile';





function App() {
  const dispatch = useDispatch()
  // const userDetail = useSelector((state) => state.userDetail);
  const [isLogin, setIsLogin] = useState(false)


  // console.log(isLogin);

  // console.log(userDetail);



  useEffect(() => {

    const getData = async () => {

      const url = "/checkuser";

      const response = await fetch(url);

      // const data = await response.json();

      // console.log(data);

      // console.log(response.status);

      if (response.status === 200) {

        setIsLogin(true)
      }
      else {
        return setIsLogin(false)
      }


    }

    getData()
    dispatch(actionCreators.userdetail({ isLogin: isLogin }));


  }, [isLogin, dispatch])


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/verifyotp" component={OtpVerifyPage} exact />
          <Route path="/changepassword" component={ForgetPassword} exact />
          <Route path="/completeprofile" component={CompleteProfile} exact />
          <Route path="/user/:username" component={UserProfile} exact />
          <Route path="/terms" component={TermsandCondition} exact />
          <ProtectedRoute exact path="/" component={Homefeed} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/messages" component={Message} />
          <ProtectedRoute path="/post" component={PostUpload} />
          <Route component={Errorpage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
