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
    this.props.history.push("/GarageList");
  };



  render() {
    return (
      <>
        <Div className="container-fluid" >
          <div className="row">
            <div className="col-lg-12 col-md-4  ml-auto">
              {/* LOGO */}
              <InnerDiv className="container">
                <div className="row ">
                  <div className="col-1 mr-auto align-self-start">
                    <Logo src={websiteLogo} alt="ovs logo" />
                  </div>
                 {this.state.button ?
                 <Link exact to="/my-account">
                   
                  <Button variant="outlined" color="primary" style={{color:"black",border:"black 1px solid"}}>{this.state.button.name}</Button>
                  </Link>
                  :<> 
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
                  </>
                  }
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
                      Book your first service at home
                    </p>
                    <p className="h5 text-muted">
                      SignUp or Login your Garage
                    </p>
                  </div>
                </div>
              </InnerDiv>
              
            </div>
            
          </div>

         
        </Div>
      </>
    );
  }
}

export default withRouter(LandingUpper);
