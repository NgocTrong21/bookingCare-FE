import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import userIcon from "../../../src/assets/images/user.svg";
import passIcon from "../../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { userServices } from "../../services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: "",
    };
  }

  refresh = () => {
    this.setState({
      username: "",
      password: "",
      loginError: "",
    });
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    this.setState({ loginError: "" });
    try {
      let data = await userServices.handleLoginApi(
        this.state.username,
        this.state.password
      );
      if (data && data.errorCode !== 0) {
        this.setState({ loginError: data.message });
      }
      if (data && data.errorCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login succeeds!");
      }
      console.log(data);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({ loginError: e.response.data.message });
        }
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    const { username, password, loginError } = this.state;

    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="form_login">
            <h2 className="title">
              <FormattedMessage id="login.login" />
            </h2>
            <div className="form-group icon-true">
              <img className="icon" src={userIcon} alt="this" />
              <input
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={username}
                onChange={this.onUsernameChange}
                placeholder="Username"
              />
            </div>

            <div id="phone-input-container" className="form-group icon-true">
              <img className="icon" src={passIcon} alt="this" />
              <input
                id="password"
                name="password"
                type="text"
                className="form-control"
                value={password}
                onChange={this.onPasswordChange}
                onKeyDown={(e) => this.handleKeyDown(e)}
                placeholder="Password"
              />
            </div>

            {loginError !== "" && (
              <div className="login-error">
                <span className="login-error-message">{loginError}</span>
              </div>
            )}

            <div className="form-group login">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handleLogin();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
