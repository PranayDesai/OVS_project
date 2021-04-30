import React from "react";
import styled from "styled-components";
import toolbox from '../../Pics and logo/MenuPage/toolbox.png';
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  font-family: sans-serif;
  h6 {
    font-weight: bolder;
    color: #8a838c;
    font-size: 30px;
  }
  p {
    color: #93959f;
    font-size: 16px;
    font-weight: 300;
    max-width: 218px;
  }
`;

function EmptyCart() {
  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h6 className="mb-4 mt-4">Cart Empty</h6>
            <img
              src={toolbox}
              alt="empty cart"
              className="w-100"
            />
            <p className="mt-4 text-left">
              Extra Charges may apply according to work needed on your vehical and parts replacement.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default EmptyCart;
