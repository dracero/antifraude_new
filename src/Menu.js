import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginApp } from "./actions";
import { connect } from "react-redux";
import Videocam from "./tfj";

class Menu extends Component {
  componentDidMount() {
    window.addEventListener("visibilitychange", (event) => {
      if (document.hidden) {
        alert("estoy");
      } else {
        alert("me fui");
      }
    });
    this.props.loginApp();
  }

  render() {
    if (this.props.rtext === true) {
      return (
        <div>
          <h2>Sistema de VideoFraude CETEC</h2>
          <Videocam />
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to={"/Photo"} className="nav-link">
                  Link a la foto
                </Link>
              </li>
              <li>
                <Link to={"/Moodle"} className="nav-link">
                  Link al parcial
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <div id="console"></div>
        </div>
      );
    } //acá termina el render
    else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    rtext: state.text
  };
}

export default connect(mapStateToProps, { loginApp })(Menu);
