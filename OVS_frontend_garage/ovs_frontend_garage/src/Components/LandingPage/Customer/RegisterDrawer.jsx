import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import drawerLogo from "../../../Pics and logo/LandingPage/drawerLogo.jpg";
import Button from '@material-ui/core/Button';

const Div = styled.div`
  font-family: sans-serif;
`;

const useStyles = makeStyles({
  list: {
    width: 450,
  },
  fullList: {
    width: "auto",
  },
});

export default function RegisterDrawer() {
  const classes = useStyles();
  const [phNo, setPhNo] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(null);
  const [fulladdress, setFullAddress] = useState("");
  

  const [state, setState] = React.useState({
    bottom: false,
  });
  const garageAddress = JSON.parse(window.localStorage.getItem("garageAddress"));

  async function getMyAddress() {
    let geoData = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((data) => {
        resolve(data.coords);
      });
    });
    if (!geoData) {
      return Error("Error while getting location");
    }
    const { latitude, longitude } = geoData;

    let response = await fetch(
      `http://localhost:9000/api/v1/users/getAddress/${latitude}/${longitude}`
    );
    if (!response) {
      return Error("Failed to fetch the adrress");
    }
    let address = await response.json();
    return address.data;
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }


    if(!open){
      if(window.localStorage.getItem("garageAddress")){
        window.localStorage.clear("garageAddress");
        setAddress(null);
      }
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLocation=()=>{
    getMyAddress().then((res)=>{
      window.localStorage.setItem("garageAddress",JSON.stringify(res))
      setAddress(JSON.parse(window.localStorage.getItem("garageAddress")));
    });
    
  }

  const displayAddress=()=>{
    if(address == null){
        return(
          <div classsName="col-lg-12">
                  <Button variant="contained" onClick={handleLocation} style={{margin:"5px 80px",color:"white",backgroundColor:"green", textAlign:"center"}}>
                      Check Location
                  </Button>
          </div>
        )
    }
    else{
      return(
        <>
            <div className="col-lg-12">
                  <TextField
                    label="area"
                    placeholder="area"
                    disabled id="standard-disabled"
                    fullWidth
                    variant="outlined"
                    defaultValue={address.area}
                    style={{
                      marginLeft: "0px",
                      borderRadius: "0px",
                    }}
                  />
                </div>
                
                <div className="col-lg-12">
                <TextField
                  label="placeName"
                  disabled id="standard-disabled"
                  placeholder="placename"
                  defaultValue={address.place}
                  fullWidth
                  variant="outlined"
                  style={{
                    marginLeft: "0px",
                    borderRadius: "0px",
                  }}
                />
              </div>
              </>
      )
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      style={{ right: 0 }}
      role="presentation"
    >
      <Div className="container mt-3" style={{ width: "90%" }}>
        <Div className="row">
          <Div className="col text-left">
            <button
              type="button"
              className="btn btn-sm"
              onClick={toggleDrawer(anchor, false)}
            >
              <i className="fas fa-times fa-lg"></i>
            </button>
            <div className="container mt-2">
              <div className="row">
                <div className="col-lg-6 ml-3">
                  <h3>Sign up</h3>
                  <small>
                    or <b style={{ color: "#002D62" }}>login to your account</b>
                  </small>
                </div>
                <div className="col-lg-4 ml-3">
                  <img
                    className="img-fluid"
                    style={{
                      width: "100px",
                      height: "85px",
                      borderRadius: "50%",
                      fload: "right",
                    }}
                    src={drawerLogo}
                    alt="logo wrench"
                  />
                </div>
              </div>
              <div className="container-fluid mt-3">
                <div className="row">
                  <div className="col-lg-12">
                    <TextField
                      label="Phone Number"
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={(e) => {
                        setPhNo(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <TextField
                      label="Name"
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <TextField
                      label="Email"
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <TextField
                      label="Password"
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <TextField
                      label="Address"
                      placeholder="Address"
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={(e) => {
                        setFullAddress(e.target.value);
                      }}
                    />
                  </div>

                 {displayAddress()}
                  <div className="col-lg-12 mt-3">
                    <small
                      style={{
                        color: "#5d8ed5",
                        marginLeft: "1%",
                        fontWeight: "bold",
                      }}
                    >
                      Have a referral code
                    </small>
                  </div>

                  <div className="col-lg-12 text-center">
                    <OtpDrawer
                      phoneNumber={phNo}
                      name={name}
                      email={email}
                      password={password}
                      setState={setState}
                      state={state}
                      address={address}
                      fulladdress={fulladdress}
                    />
                  </div>
                  <div>
                    <small
                      style={{
                        fontSize: "9px",
                        fontWeight: "bold",
                      }}
                      className="text-muted mx-3"
                    >
                      By creating an account, I accept the{" "}
                      <small
                        style={{
                          color: "#5d8ed5",
                          fontSize: "9px",
                          fontWeight: "bold",
                        }}
                      >
                        Terms & Conditions
                      </small>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </Div>
        </Div>
      </Div>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        className=" btn btn-lg align-self-center font-weight-bold"
        onClick={toggleDrawer("right", true)}
        style={{
          borderRadius: "0px",
          color: "white",
          backgroundColor: "black",
        }}
      >
        {"Sign up"}
      </button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}

function OtpDrawer({ phoneNumber, name, email, password, setState, state,address,fulladdress }) {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const classes = useStyles();
  const [state2, setState2] = React.useState({
    bottom: false,
  });

  const toggleOTPDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState2({ ...state2, [anchor]: open });
  };

  const handleVerify = () => {
    // console.log(phoneNumber, name, email, password, otp);
    // console.log(setState, state);
    axios
      .post(`http://localhost:9000/api/v1/garages/addGarage`, {
        otp: parseInt(otp),
        name: name,
        email: email,
        password: password,
        phonenumber: phoneNumber,
        "location":{
		      "lat": address.lat,
		      "long": address.long,
		      "area": address.area,
		      "place_name": address.place
	      },
	      "address":fulladdress
      })
      .then((res) => {
        console.log(res.data);
        // alert('Registeration Successfull');
        setState2({ ...state2, right: false });
        setState({ ...state, right: false });
        localStorage.setItem("garageData", JSON.stringify(res.data.data));
        history.push("/my-account");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  const getOtp = () => {
    axios
      .post(`http://localhost:9000/api/v1/garages/verifyGarage`, {
        "name":name,
	      "phonenumber": phoneNumber,
	      "email":email,
	      "password":password,
        "location":{
		      "lat": address.lat,
		      "long": address.long,
		      "area": address.area,
		      "place_name": address.place
	      },
	      "address":fulladdress
      })
      .then((res) => {
        // console.log(res);
        // alert(
        //     `${name} Registered successfull \n OTP has been sent to ${phoneNumber}`,
        // );
        setState2({ ...state2, right: true });
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      style={{ right: 0 }}
      role="presentation"
    >
      <Div className="container mt-3" style={{ width: "90%" }}>
        <Div className="row">
          <Div className="col text-left">
            <button
              type="button"
              className="btn btn-sm"
              onClick={toggleOTPDrawer(anchor, false)}
            >
              <i className="fas fa-arrow-left fa-lg"></i>
            </button>
            <div className="container mt-2">
              <div className="row">
                <div className="col-lg-6 ml-3">
                  <h3>Enter OTP</h3>
                  <small>We've sent an OTP to your phone number.</small>
                </div>
                <div className="col-lg-4 ml-4">
                  <img
                    className="img-fluid"
                    style={{
                      width: "100px",
                      height: "85px",
                      borderRadius: "50%",
                      fload: "right",
                    }}
                    src={drawerLogo}
                    alt="logo wrench"
                  />
                </div>
              </div>
              <div className="container-fluid mt-5">
                <div className="row">
                  <div className="col-lg-12">
                    <TextField
                      label="Phone Number"
                      value={phoneNumber}
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <TextField
                      label="One time password"
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12 text-center">
                    <button
                      style={{
                        background: "#002D62",
                        border: "1px solid #002D62",
                        color: "white",
                        marginTop: "15px",
                        width: "318px",
                        borderRadius: "2%",
                      }}
                      onClick={handleVerify}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          marginTop: "9px",
                        }}
                      >
                        VERIFY OTP
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Div>
        </Div>
      </Div>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        style={{
          background: "#002D62",
          border: "1px solid #002D62",
          color: "white",
          marginTop: "15px",
          width: "318px",
          borderRadius: "2%",
        }}
        onClick={getOtp}
      >
        <p
          style={{
            fontWeight: "bold",
            marginTop: "9px",
          }}
        >
          {"CONTINUE"}
        </p>
      </button>
      <Drawer
        anchor={"right"}
        open={state2["right"]}
        onClose={toggleOTPDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
