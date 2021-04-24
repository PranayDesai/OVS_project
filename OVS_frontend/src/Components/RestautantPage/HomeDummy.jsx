import React, { useEffect, useState } from "react";
import Promotions from "./Promotions";
import styled from "styled-components";
import HotelCard from "./HotelCard";
import MoreCard from "./MoreCard";
var axios = require("axios");

const Wrapper = styled.div`
  color: #535665;
  font-family: sans-serif;

  p {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 1px;
  }

  small {
    color: "light grey";
    font-size: 10px;
    opacity: 0.8;
    text-transform: uppercase;
    margin-top: 1px;
    font-weight: 300;
  }

  .item {
    padding-left: 25px;
    padding-top: 15px;
    padding-bottom: 15px;

    &:hover {
      color: #002D62;
    }
  }

  .topHeader {
    margin-top: 1px;
    position: sticky;
    top: 90px;
  }

  .active {
    background: #002D62;
    margin-right: 15px;
    color: #fff;
    &:hover {
      color: #fff !important;
    }
  }

  .content {
    p {
      margin: 0;
      margin-top: 0.5rem;
      line-height: 1.2;
    }
    small {
      margin: 0;
    }
  }

  .img-wrap {
    i {
      width: 40px;
      font-size:2rem;
      
    }

    &:hover img {
      transform: scale(1.2);
    }
  }
`;

const Section = styled.div`
  /* // border: 1px solid red; */
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #bebfc5;
`;

const Title = styled.p`
  /*  // border: 1px solid black; */
  font-size: 28px !important;
  font-weight: 600;
  color: #282c3f;
  line-height: 1.2;
  margin-left: 12px;
`;

function HomeDummy() {
    
  const [topPicks, setTopPicks] = useState([]);
    const [twoWheelerOnly, setTwoWheelerOnly] = useState([]);
    const [newlyAdded, setNewlyAdded] = useState([]);
    const [fourWheelerOnly, setFourWheelerOnly] = useState([]);
    const [threeWheelerOnly, setThreeWheelerOnly] = useState([]);
    
    
    const [totalTwoWheelerOnly, setTotalTwoWheelerOnly] = useState([]);
    const [totalNewlyAdded, setTotalNewlyAdded] = useState([]);
    const [totalFourWheelerOnly, setTotalFourWheelerOnly] = useState([]);
    const [totalThreeWheelerOnly, setTotalThreeWheelerOnly] = useState([]);
    const [totalTopPicks, setTotalTopPicks] = useState([]);
  
  const {lat,long,area,place_name} = JSON.parse(window.localStorage.getItem("Coordinates"));
  const getData = (filter) => {
    var config = {
      method: "get",
      // url: `${process.env.REACT_APP_API_URL}/api/restaurant?lat=12.9259&lng=77.6229&filter=${filter}&page=1&limit=5`,
      url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${lat},${long}/unit/km/subCategory/${filter}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if (filter === "top-pick") {
          setTopPicks(response.data.garages);
          setTotalTopPicks(response.data.results);
          console.log(topPicks);
          console.log(totalTopPicks);
        } else if (filter === "two-wheeler-only") {
          setTwoWheelerOnly(response.data.garages);
          setTotalTwoWheelerOnly(response.data.results);
        } else if (filter === "newly-added") {
          setNewlyAdded(response.data.garages);
          setTotalNewlyAdded(response.data.results);
        } else if (filter === "four-wheeler-only") {
          setFourWheelerOnly(response.data.garages);
          setTotalFourWheelerOnly(response.data.results);
        } else if(filter === "three-wheeler-only"){
              setThreeWheelerOnly(response.data.garages);
              setTotalThreeWheelerOnly(response.data.results);
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getData("top-pick");
    getData("two-wheeler-only");
    getData("newly-added");
    getData("four-wheeler-only");
    getData("three-wheeler-only");
    
  }, []);

  return (
    
    <>
      <Promotions />
      
      <div className="container">
        <Wrapper>
          <div className="row">
            <div className="col-3">
              <div className="border-left border-right border-bottom shadow topHeader pt-5">
                <div className="item active" href="topPicks">
                  <div className="row" id="list">
                    <div className="col-3 p-1 img-wrap nohover">
                    <i class="fas fa-fire"></i>
                    </div>
                    <div className="col-9 text-left content">
                      <p>Top Picks</p>
                      <small>{totalTopPicks} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className="item" href="Exclusive">
                  <div className="row">
                    
                    <div className="col-3 text-center img-wrap">
                    <i class="fas fa-biking"></i>
                    </div>
                    <div className="col-9 text-left content">
                      <p>Two Wheeler only</p>
                      <small>{totalTwoWheelerOnly} OPTIONS</small>
                    </div>
                    
                  </div>
                </div>
                <div className="item " href="Premium">
                  <div className="row">
                    <div className="col-3 text-right img-wrap">
                    <i class="fas fa-smile"></i>
                    </div>
                    <div className="col-9 text-left content">
                      <p>Newly Added</p>
                      <small>{totalNewlyAdded} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className="item" href="vegOnly">
                  <div className="row">
                    <div className="col-3 text-center img-wrap">
                    <i class="fas fa-car"></i>
                    </div>
                    <div className="col-9 text-left content">
                      <p>Four Wheeler Only</p>
                      <small>{totalFourWheelerOnly} OPTIONS</small>
                    </div>
                  </div>
                </div>
                
                <div className="item" href="allItems">
                  <div className="row">
                    <div className="col-3 text-center img-wrap ">
                    <i class="fas fa-arrow-down"></i>
                    </div>
                    <div className="col-9 text-left  mb-5 content">
                      <p>SEE ALL</p>
                      <small>Garages</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-9"
              data-spy="scroll"
              data-target="#list"
              data-offset="0"
            >
              <Section className="row">
                <Title>Top Pics</Title>
                <div className="row row-cols-3" id="topPicks">
                  {
                  topPicks.map((item,index) => (
                    index<6&&<HotelCard data={item} key={item._id} />
                  ))}
                  <MoreCard filter={"top-pick"} more={totalTopPicks - 5} />
                </div>
              </Section>
              <Section className="row">
                <Title>Two Wheeler Only</Title>
                <div
                  className="row row-cols-3 justify-content-center"
                  id="Exclusive"
                >
                  {twoWheelerOnly.map((item,index) => (
                   index<6&& <HotelCard data={item} key={item._id} />
                  ))}
                  <MoreCard filter={"two-wheeler-only"} more={totalTwoWheelerOnly - 5} />
                </div>
              </Section>
              <Section className="row">
                <Title>Newly Added</Title>
                <div
                  className="row row-cols-3 justify-content-center"
                  id="Newly Added"
                >
                  {newlyAdded.map((item,index) => (
                    index<6&&<HotelCard data={item} key={item._id} />
                  ))}
                  <MoreCard filter={"newly-added"} more={totalNewlyAdded - 5} />
                </div>
              </Section>
              <Section className="row">
                <Title>Four Wheeler Only</Title>
                <div
                  className="row row-cols-3 justify-content-center"
                  id="fourWheelerOnly"
                >
                  {fourWheelerOnly.map((item,index) => (
                    index<6&&<HotelCard data={item} key={item._id} />
                  ))}
                  <MoreCard filter={"four-wheeler-only"} more={totalFourWheelerOnly - 5} />
                </div>
              </Section>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default HomeDummy;
