import { NavLink } from "react-router-dom";
import React from "react";

class MainNav extends React.Component {
  render() {
    return (
      <div className="navbar-nav mr-auto">
        <NavLink
          to="/"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          URL Shortening
        </NavLink>
      </div>
    );
  }
}

export default MainNav;
