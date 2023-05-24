import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import TrailImages from '../img/Headimg.png';
import UsersAdd from '../components/UsersAdd';
import UsersLogin from '../components/UsersLogin';

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isImageMoved, setIsImageMoved] = useState(false);

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <UsersAdd />
                </div>
                <p>
                  <b onClick={toggle} className="pointer">
                    로그인
                  </b>
                </p>
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <UsersLogin />
                </div>
                <p>
                  <b onClick={toggle} className="pointer">
                    회원가입
                  </b>
                </p>
              </div>
            </div>
            <div className="form-wrapper"></div>
          </div>
          {/* END SIGN IN */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className="row content-row">
          {/* SIGN IN CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="text sign-in" style={{ display: 'flex' }}>
              <h2 style={{ marginRight: '12vw' }}></h2>
            </div>
          </div>
          {/* END SIGN IN CONTENT */}
          {/* SIGN UP CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="text sign-up" style={{ display: 'flex' }}>
              <h2 style={{ marginLeft: '12vw' }}></h2>
            </div>
          </div>
          {/* END SIGN UP CONTENT */}
        </div>
        {/* END CONTENT SECTION */}
      </div>
    </div>
  );
}

export default Login;
