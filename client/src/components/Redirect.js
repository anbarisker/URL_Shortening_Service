import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { Home } from "../view";

class Redirect extends Component {
  // Init state
  state = {
    redirectURL: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    axios
      .get("/api/redirectUrl", {
        headers: {
          id,
        },
      })
      .then((res) => {
        console.log(res.data.data.Item.longurl);
        if (res.data.data.Item.longurl) {
          window.location.replace(res.data.data.Item.longurl);
        }
      })
      .catch((err) => {
        this.setState({
          redirectURL: "URL Not ssfound",
        });
        window.location.replace("/");
      });
  }

  render() {
    return (
      <Route exact path="/">
        {<Home />}
      </Route>

      // <div>
      //     <p>{this.state.redirectURL}</p>
      // </div>
    );
  }
}

export default Redirect;
