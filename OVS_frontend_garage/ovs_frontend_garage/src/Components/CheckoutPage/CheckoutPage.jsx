import React, { useState, useEffect } from 'react';
import CheckoutNavigator from './CheckoutNavigator';
import styled from 'styled-components';
import Login from './Customer/Login';
import Address from './Customer/Address';
import Payment from './Customer/Payment';
import Orders from './Customer/Orders';
import MainFooter from '../LandingPage/MainFooter';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
    overflow: hidden;
    font-family: sans-serif;
    min-height: 100%;
    background: #e9ecee;
    margin-top: 5.2%;
    padding-bottom: 10%;
    font-size: 14px;
    line-height: 1.2;
    min-height: 100%;
   
`;

const CheckoutPage = (props) => {
    
    const [isAddrSelected, setIsAddrSelected] = useState(false);
    const history = useHistory();
    const customerData = JSON.parse(window.localStorage.getItem("customerData"));
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    const CustomerCurrentLoc = JSON.parse(window.localStorage.getItem("CustomerCurrentLoc"));
    const garage = JSON.parse(window.localStorage.getItem("hotel"));

    useEffect(() => {
        setIsAddrSelected(props.location.isAddrSelected || false);
    }, [props.location.isAddrSelected]);

const goToMyAccount = ()=>{
    
    if(customerData && cart && CustomerCurrentLoc && garage){
        axios.post("http://localhost:9000/api/v1/orders",{
            user_id:customerData._id,
            garage_id:garage._id,
            userAddress:{
                flat_no:CustomerCurrentLoc.flat_no,
                landmark:CustomerCurrentLoc.landmark,
                lat:CustomerCurrentLoc.lat,
                long:CustomerCurrentLoc.long,
                place_name:CustomerCurrentLoc.place_name
            },
            serviceList:cart.map(c=>{
                return {
                category:c.category,
                name: c.name,
		        price:c.price,
		        description:c.description,
		        img_url: c.img_url,
		        qty: c.qty
                }
            }),
            orderStatus:"pending"
        }).then((res)=>{history.push({pathname:"/my-account"})}
             
        ).catch((err)=>{
            console.log(err.response.data.message);
        })
        
    }
    
}

    return (
        <>
            <CheckoutNavigator />
            <Wrapper className='container-fluid'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='row row-cols-1 text-left'>
                                <div className='col-11'>
                                    <Login />
                                </div>
                                <div className='col-11'>
                                    <Address flag={isAddrSelected} />
                                </div>
                                {isAddrSelected ? (
                                    goToMyAccount()
                                ) : (
                                    <div className="col-11"></div>
                                )}
                            </div>
                        </div>
                        <div className='col-4'>
                            <Orders />
                        </div>
                    </div>
                </div>
            </Wrapper>
            
        </>
    );
};
export default CheckoutPage;
