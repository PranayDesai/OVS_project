import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import c1 from '../../Pics and logo/GarageList/c1.jpg';
import c2 from '../../Pics and logo/GarageList/c2.png';
import c3 from '../../Pics and logo/GarageList/c4.png';
import c4 from '../../Pics and logo/GarageList/c6.png';
import c5 from '../../Pics and logo/GarageList/c7.png';
import c6 from '../../Pics and logo/GarageList/c8.png';

const Img = styled.img`
  cursor: pointer;
  display: block;
  width: 250px;
  height: 250px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    backface-visibility: visible;
  }
`;

const Wrapper = styled.header`
  max-width: 100%;
  min-width: 100%;
  position: relative;
  margin: auto;
  margin-top: 60px;
  padding: 20px 0;
  background: #fff;
`;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function Promotions() {
  return (
    <Wrapper>
      <div style={{ background: "#171a29", padding: "30px 20px" }}>
        <div className="container my-3">
          <Slider {...settings}>
            <div className="col">
              <Img
              src={c1}
                alt="promotion img"
              />
            </div>
            <div className="col">
              <Img
              src={c2}
                alt="promotion img"
              />
            </div>
            <div className="col">
              <Img
              src={c3}
                alt="promotion img"
              />
            </div>
            <div className="col">
              <Img
              src={c4}
                alt="promotion img"
              />
            </div>
            <div className="col">
              <Img
              src={c5}
                alt="promotion img"
              />
            </div>
            <div className="col">
              <Img
              src={c6}
                alt="promotion img"
              />
            </div>
            
          </Slider>
        </div>
      </div>
    </Wrapper>
  );
}

export default Promotions;
