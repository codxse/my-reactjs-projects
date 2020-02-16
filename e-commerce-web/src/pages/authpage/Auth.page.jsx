import React from 'react';
import "./Auth.styles.scss";
import SignIn from "../../components/sign-in/SignIn.component";

const AuthPage = props => (
  <div className="sign-in-and-sign-up">
    <SignIn />
  </div>
);

export default AuthPage;