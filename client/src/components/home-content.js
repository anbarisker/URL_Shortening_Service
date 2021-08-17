import React, { Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { MDBInput,MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import validator from "validator";
import Test from "./list"

class HomeContent extends Component {

 
  state = {
    id: "",
    longurl: "",
    link: "",
  };
  

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(this.state.longurl, {
      require_protocol: true,
    });
    const validShortURL = validator.isEmpty(this.state.id);
    if (!validURL) {
      alert("Please check the url, have http");
    } else if(validShortURL){
      alert("Please enter the short url");
    } else {
      console.log("URL is: ", this.state.longurl);
      //Post Values
      axios
        .post("/api/shortenUrl/", {
          id: this.state.id,
          longurl: this.state.longurl,
          createddate: new Date().toISOString()
        })
        .then((res) => {
          console.log(res.data.data.id);
          this.setState({
            link: window.location.href+`${res.data.data.id}`,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="next-steps">
        <h2 className="my-5 text-center">URL Shortening Service</h2>
        <div className="row">
        <div className="col-md-2 mb-19"></div>
          <div className="col-md-8 mb-19">
            <h6 className="mb-3">
              <FontAwesomeIcon icon={faLink} className="mr-2" />
              Original URL
            </h6>
            <form onSubmit={this.handleSubmit}>
              <MDBInput
                className="mb-3"
                label="Enter the Original URL including the http(s)"
                id="longurl"
                data-testid="longurl"
                name="longurl"
                type="text"
                onChange={this.handleChange}
              />
              <MDBInput
                className="mb-3"
                label="Enter new short URL ID"
                id="id"
                data-testid="id"
                name="id"
                type="text"
                onChange={this.handleChange}
              />
              <MDBBtn value="shorten" data-testid="submitBtn" className="mx-0" color="dark">
                Submit
              </MDBBtn>
            </form>
            <div className="row-fluid">
            <div className="span12 text-center">
            <span id="result" className="span12 text-center">
              <a href={this.state.link}>{this.state.link}</a>
            </span>
            </div>
            </div>
          </div>
          <div className="col-md-2 mb-19"></div>
          {/* <div className="col-md-5 mb-4">
            <h6 className="mb-0">
              <FontAwesomeIcon icon={faLink} className="mr-2" />
                List of URLS
            </h6>
            <Test/>
          </div> */}
        </div>
        <div className="row">
          <Test/>
          </div>
      </div>
    );
  }
}

export default HomeContent;
