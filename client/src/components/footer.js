import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-light p-4 text-center">
        <div className="logo" />
        <p>
          URL Shortening Service project provied by{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/anbarisker">
            Anba
          </a>
        </p>
      </footer>
    );
  }
}
export default Footer;
