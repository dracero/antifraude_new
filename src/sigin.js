import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { loginApp } from "./actions";
import { logoutApp } from "./actions";

const CLIENT_ID =
  "736950382049-22lb4jlnbuo5nt0luno6kc2cabdescum.apps.googleusercontent.com";

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ""
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  componentDidMount() {
    if (document.getElementById("console")) {
      document.getElementById("console").innerText = "";
    }
  }

  login(response) {
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
      const { dispatch } = this.props;
      dispatch(loginApp(this.state.isLogined));
    }
  }

  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      accessToken: ""
    }));
    const { dispatch } = this.props;
    dispatch(logoutApp(this.state.isLogined));
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  render() {
    return (
      <div>
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
      </div>
    );
  }
}

export default connect()(GoogleBtn);
