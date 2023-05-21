import React, { useEffect } from 'react';
import $ from 'jquery';
import 'jquery.flip';
import 'public/js/jquery.flip.js';
window.jQuery = $;

function BasicExample() {
  useEffect(() => {
    $("#card").flip({
      trigger: 'manual'
    });
  }, []);

  const handleSignupLink = () => {
    $(".signin_form").css('opacity', '0');
    $(".signup_form").css('opacity', '100');
    $("#card").flip(true);
  };

  const handleUnflipBtn = () => {
    $(".signin_form").css('opacity', '100');
    $(".signup_form").css('opacity', '0');
    $("#card").flip(false);
  };

  return (
    <div className="main">
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      {/* Include the above in your HEAD tag */}
      <body className="main">
        <div className="login-screen"></div>
        <div className="login-center">
          <div className="container min-height" style={{ marginTop: '20px' }}>
            <div className="row">
              <div className="col-xs-4 col-md-offset-8">
                <div className="login" id="card">
                  <div className="front signin_form">
                    <p>Login Your Account</p>
                    <form className="login-form">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Type your email"
                          />
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-user"></i>
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Type your password"
                          />
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-lock"></i>
                          </span>
                        </div>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />Remember me next time.
                        </label>
                      </div>

                      <div className="form-group sign-btn">
                        <input
                          type="submit"
                          className="btn"
                          value="Log in"
                        />
                        <p>
                          <a href="#" className="forgot">
                            Can't access your account?
                          </a>
                        </p>
                        <p>
                          <strong>New to TimeInfo?</strong>
                          <br />
                          <a
                            href="#"
                            id="flip-btn"
                            className="signup signup_link"
                            onClick={handleSignupLink}
                          >
                            Sign up for a new account
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                  <div
                    className="back signup_form"
                    style={{ opacity: '0' }}
                  >
                    <p>Sign Up for Your New Account</p>
                    <form className="login-form">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                          />
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-user"></i>
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                          />
                          <span className="input-group-btn">
                            <button
                              type="button"
                              className="btn btn-cyan"
                            >
                              <span className="fa fa-refresh"></span>
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-lock"></i>
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-envelope"></i>
                          </span>
                        </div>
                      </div>

                      <div className="form-group sign-btn">
                        <input
                          type="submit"
                          className="btn"
                          value="Sign up"
                        />
                        <br />
                        <br />
                        <p>
                          You have already Account So{' '}
                          <a
                            href="#"
                            id="unflip-btn"
                            className="signup"
                            onClick={handleUnflipBtn}
                          >
                            Log in
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-Flip/1.0.18/jquery.flip.js"></script>
      </body>
    </div>
  );
}

export default BasicExample;
