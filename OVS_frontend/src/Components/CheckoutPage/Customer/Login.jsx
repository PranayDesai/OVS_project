import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    
    letter-spacing: -0.3px;
    line-height: 1.2;
    background: #fff;
    margin-bottom: 20px;
    margin-top: 30px;
    padding-top: 35px;
   /*  // padding-right: 40px; */
    padding-bottom: 39px;
    /* // padding-left: 40px; */
`;

const Title = styled.p`
    font-size: 32px;
    font-weight: 620;
    color: #282c3f;
    margin-bottom: 0px;
`;

const Logo = styled.div`
    left: -35px;
    width: 0px;
    height: 0px;
    background-color: #282c3f;
    box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
    top: -10px;
    padding: 0px !important;
`;

const Tick = styled.img`
    margin-left: 15px;
    height: 20px;
    width: 20px;
    vertical-align: inherit;
`;

const Avatar = styled.i`
    height: 50px;
    width: 50px;
    color:white;
    background-color:black;
    font-size:40px;
    padding:3px;
    border-radius:50%;
    vertical-align: inherit;
    text-align:center;
    margin-radius: 0px;
    box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
`;

const Info = styled.p`
    margin-top: 35px;
    margin-bottom: 0px;
    font-weight: 500;
    line-height: 1.12;
    font-size: 18px;
    color: #282c3f;
    text-transform: capitalize;
`;

const Login = () => {
    const data = JSON.parse(window.localStorage.getItem('customerData'));
    return (
        <>
            <Wrapper className='container'>
                {console.log(data)}
                <div className='row'>
                    <Logo className='col-1'>
                        <Avatar className="fas fa-user" />
                    </Logo>
                    <div className='col-11'>
                        
                            <div className='col'>
                                <Title>
                                    Logged in
                                    <i class="fas fa-check-circle"></i>
                                </Title>
                            </div>
                            <div className='col'>
                                <Info>
                                    {' '}
                                    {data.name}
                                    {'  |  '}
                                    
                                    {data.phonenumber}
                                </Info>
                            </div>
                        </div>
                    
                </div>
            </Wrapper>
        </>
    );
};

export default Login;
