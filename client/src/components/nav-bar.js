import React from "react";

import MainNav from "./main-nav";


class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-container mb-3">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container">
            <div className="navbar-brand logo" />
            <img src="https://img.icons8.com/ios/50/000000/delete-link.png" alt="logo"/>
            <MainNav />
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
