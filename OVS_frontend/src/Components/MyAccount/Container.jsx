import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
    letter-spacing: 0;
    color: #171a29;
    font-family: sans-serif;
    /* // border: 1px solid red;
    div {
        // border: 1px solid red;
    } */
`;

const Title = styled.p`
    /* // color: #282c3f; */
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    line-height: 1.2;
    padding-top: 20px;
    margin-bottom: 0px;
    padding-bottom: 20px;
    /* // border: 1px solid red; */
    &:hover {
        color: #171a29;
        font-size: 17px;
    }
    line-height: 1.5rem;
`;

const Icon = styled.i`
cursor: pointer;
width: 30px;
height: 30px;
margin-right: 20px;
margin-left: 10px;
font-size:2rem;
&:hover {
    transform: scale(1.2);
}
`;

const Container = (props) => {
    /* const [data, setData] = useState({}); */
/* 
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('customerData'))._id;
        var config = {
            method: 'get',
            url: `http://localhost:9000/api/v1/users/${id}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                console.log(response.data,"inside container");
                setData(response.data.data);
                
            })
            .catch(function (error) {
                // console.log(error.response.data);
            });
    }, []); */
    /* useEffect(()=>{
    setData(props);
    console.log(data,"inside container");
    }) */
    
    const data = props.data;
    console.log(data);
    return (
        <Wrapper>
            <div className='container-fluid p-5' style={{ width: '94%' }}>
                <div className='row'>
                    <div
                        className='col-12 text-left pt-4 pb-4 pl-4 pr-0 text-capitalize'
                        style={{
                            background: '#edf1f7',
                            maxWidth: '280px',
                            minHeight: '600px',
                        }}
                    >
                        <div
                            className='col text-muted'
                            style={{
                                background: '#fff',
                            }}
                        >
                            <Title
                                style={{
                                    color: '#171a29',
                                }}
                            >
                                <Icon className="fas fa-wrench"  />
                                orders
                            </Title>
                        </div>
                        <div className='col text-muted'>
                            <Title>
                                {' '}
                                <Icon
                                    className="fas fa-heart"
                                />
                                favorites
                            </Title>
                        </div>
                        <div className='col text-muted'>
                            <Title>
                                {' '}
                                <Icon className="fas fa-credit-card"/>
                                payments
                            </Title>
                        </div>
                        <div className='col text-muted'>
                            <Title>
                                {' '}
                                <Icon className="fas fa-map-marker-alt" />
                                addresses
                            </Title>
                        </div>
                    </div>
                    <div className='col pl-5' style={{ paddingTop: '2.45rem' }}>
                        <div
                            className='col text-left mb-4'
                            style={{ fontSize: '24px', fontWeight: 600 }}
                        >
                            Orders
                        </div>
                        <div className='w-100'></div>
                        <div className='col row-cols-1'>
                            
                            {data &&
                                data.map((item) => <OrderCard data={item} />)}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Container;
