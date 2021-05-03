import React, { Component } from "react";
import {
  Div,
  InnerDiv,
  MainImg,
  Logo,
  Search,
  City,
  CardContainer,
  Card,
  CardImg,
} from "./LandingStyledComponents";
import LoginDrawer from "./Customer/LoginDrawer";
import RegisterDrawer from "./Customer/RegisterDrawer";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { withRouter } from "react-router-dom";
import websiteLogo from "../../Pics and logo/LandingPage/WebSiteLogo.png";
import CarService from "../../Pics and logo/LandingPage/CarService.jpg";
import fastSupport from "../../Pics and logo/LandingPage/fastSupport.jpg";
import minimalCharges from "../../Pics and logo/LandingPage/minimalCharges.jpg";
import bestMechanics from "../../Pics and logo/LandingPage/bestMechanics.jpg";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class LandingUpper extends Component {
  constructor(props) {
    super(props);
    const userData = JSON.parse(window.localStorage.getItem('customerData'));
    console.log(userData);
    this.state = {
      data: [],
      visible: false,
      button:userData || false
    };
  }

  handleInputChange = (e) => {
    // const history = useHistory();
    axios({
      method: "get",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json`,
      params: {
        access_token:
          "pk.eyJ1IjoiZmFoZHNoYWlraCIsImEiOiJja2gzYzB3a3YwaXlsMnJvaWJ3ZDdiYzBpIn0.EC5-vAFFL-32D0ZCkCkQFg",
      },
    })
      .then((res) => {
        this.setState({
          data: res.data.features,
        });
        // console.log(res);
        this.getLocation(res.data.features);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLocation = (data) => {
    data.map((item, i) => {
      if (i === 0) {
        var long = item.center[0];
        var lat = item.center[1];
        var temp = item.place_name.split(", ");
        var area = temp[0];
        temp.shift();
        var place_name = temp.join(", ");
        

        const Coordinates = {
          lat,
          long,
          area,
          place_name,
        };
        // console.log(Coordinates);
        localStorage.setItem("Coordinates", JSON.stringify(Coordinates));
        console.log(Coordinates);
      }
    });
  };

  goTo = () => {
    this.props.history.push("/Restaurants");
  };



  render() {
    return (
      <>
        <Div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-4  ml-auto">
              {/* LOGO */}
              <InnerDiv className="container">
                <div className="row ">
                  <div className="col-1 mr-auto align-self-start">
                    <Logo src={websiteLogo} alt="ovs logo" />
                  </div>
                 
                  <div
                    className="col-lg-2 btn btn-lg align-self-center font-weight-bold "
                    style={{ textAlign: "right" }}
                  >
                    <LoginDrawer />
                    
                  </div>
                  <div
                    className="col-lg-3 btn btn-lg align-self-center font-weight-bold"
                    style={{
                      // border: '1px solid red',
                      textAlign: "left",
                    }}
                  >
                    <RegisterDrawer />
                  </div>
                  
                  
                  </div>
                </InnerDiv>

              {/* SOME TEXT & TAG LINE */}
              <InnerDiv className="container">
                <div className="row align-self-start row-cols-1">
                  <div className="col text-left text-wrap  mb-1">
                    <p className="h2 font-weight-bold">
                      {" "}
                      Online Vehicle Services{" "}
                    </p>
                  </div>
                  <div className="col text-left text-wrap">
                    <p className="h4 text-muted">
                      Book your fist service at home
                    </p>
                  </div>
                </div>
              </InnerDiv>

              {/* SEARCH BAR */}
              <div className="container">
            {/*     <Search
                  className="row "
                  style={{ border: "1px solid #002D62" }}
                >
                  <div className="col-10 text-left align-self-center">
                    <div className="row">
                      <Autocomplete
                        className="col-lg-9 col-md-8 col-sm-8 mr-0  text-left form-control-plaintext form-control-lg ml-2  text-muted font-weight-bold"
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={this.state.data.map(
                          (place) => place.place_name
                        )}
                        renderInput={(params) => (
                          <TextField
                            className="text-left form-control-plaintext form-control-lg text-muted font-weight-bold"
                            id="outlined-helperText"
                            placeholder="Enter Your current location"
                            onChange={this.handleInputChange}
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                            // variant='outlined'
                            fullWidth
                            style={{
                              // border:'1px solid red',
                              fontSize: "20px",
                            }}
                          />
                        )}
                      />
                      <button
                        type="button"
                        className="col-2  btn btn-sm align-self-center text-right ml-4"
                        
                      >
                        Locate Me
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="col-2 btn btn-lg"
                    onClick={this.goTo}
                    style={{
                      height: "100%",
                      color: "white",
                      backgroundColor: "#002D62",
                      borderRadius: "0px",
                    }}
                  >
                    <h6 className="font-weight-bold">Find Garages</h6>
                  </button>
                </Search> */}
              </div>

            </div>
            {/* MAIN IMAGE */}
            <div className="col-5">
              <MainImg src={CarService} alt="ovs main" />
            </div>
          </div>

          {/* MIDDLE PART */}
          <CardContainer className="row justify-content-around pb-2">
            <div className="col-3 ml-2 mt-3 pb-5">
              <Card className="card">
                <CardImg
                  src={fastSupport}
                  className="card-img-top align-self-center"
                  alt="ovs fastSupport"
                />
                <div className="card-body" style={{ color: "black" }}>
                  <p className="card-title h4 font-weight-bold mt-2">
                    Super Fast Support
                  </p>
                  <p className="card-text">Get help anytime anywhere</p>
                </div>
              </Card>
            </div>
            <div className="col-3 mt-3">
              <Card className="card">
                <CardImg
                  src={bestMechanics}
                  className="card-img-top align-self-center"
                  alt="ovs bestMechanics"
                />
                <div className="card-body" style={{ color: "black" }}>
                  <h5 className="card-title h4 font-weight-bold mt-2">
                    Best Workers
                  </h5>
                  <p className="card-text">
                    Best Garages and Mechanics at your home
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-3 mr-2 mt-3">
              <Card className="card">
                <CardImg
                  src={minimalCharges}
                  className="card-img-top align-self-center"
                  alt="ovs minimalCharges"
                />
                <div className="card-body" style={{ color: "black" }}>
                  <h5 className="card-title h4 font-weight-bold mt-2">
                    Minimal Charges
                  </h5>
                  <p className="card-text">
                    Get your services and repairs done at best prices in the
                    market
                  </p>
                </div>
              </Card>
            </div>
          </CardContainer>
        </Div>
      </>
    );
  }
}

export default withRouter(LandingUpper);
