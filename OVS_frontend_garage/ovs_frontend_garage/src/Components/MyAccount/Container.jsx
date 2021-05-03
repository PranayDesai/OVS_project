import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
    letter-spacing: 0;
    color: #171a29;
    font-family: sans-serif;
`;

const Title = styled.p`
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    line-height: 1.2;
    padding-top: 20px;
    margin-bottom: 0px;
    padding-bottom: 20px;
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

const Container = () => {
    const [data, setData] = useState({});
    

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('garageData'))._id;
        var config = {
            method: 'get',
            url: `http://localhost:9000/api/v1/garages/${id}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setData(response.data.data);
            })
            .catch(function (error) {
                /* console.log(error.response.data); */
            });
    }, []);
  /*   console.log(data); */
    return (
        <Wrapper>
            <div className='container-fluid p-5' style={{ width: '94%' }}>
                <div className='row'>
                    <div
                        className='col row-cols-1 text-left pt-4 pb-4 pl-4 pr-0 text-capitalize'
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
                                Orders
                            </Title>
                        </div>
                        <div className='col text-muted'>
                            <Title>
                                {' '}
                                <Icon
                                    className="fas fa-heart"
                                />
                                Favorites
                            </Title>
                        </div>
                        <div className='col text-muted'>
                            <Title>
                                {' '}
                                <Icon className="fas fa-credit-card"/>
                                Payments
                            </Title>
                        </div>
                        <div className='col text-muted'>
                            <Title>
                                {' '}
                                <Icon className="fas fa-map-marker-alt" />
                                Addresses
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
                            {data.orders &&
                                data.orders
                                    .map((item) => <OrderCard data={item} key={item._id} />)}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Container;
