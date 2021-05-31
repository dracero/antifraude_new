import React, { Component } from "react";
import Iframe from "react-iframe";

class Moodle extends Component {
  render() {
    return (
      <Iframe
        url="http://127.0.0.1/moodle/login/index.php"
        width="100%"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    );
  }
}

export default Moodle;
