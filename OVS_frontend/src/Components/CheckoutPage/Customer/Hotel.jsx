import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-left: 0px !important;

    div {
        /* // border: 1px solid red !important; */
        padding-right: 0px !important;
        padding-left: 0px !important;
    }
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
    padding-left: 0px !important;
`;

const Title = styled.p`
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 17px !important;
    color: #282c3f;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1rem;
`;

const Hotel = () => {
    const [garageName, setGarageName] = useState('');
    const [garageImg, setGarageImg] = useState('');
    const [garageArea, setGarageArea] = useState('');

    useEffect(() => {
        setGarageName(JSON.parse(localStorage.getItem('hotel')).name);
        setGarageImg(JSON.parse(localStorage.getItem('hotel')).img_url);
        setGarageArea(
            () =>
                `${JSON.parse(localStorage.getItem('customerData')).geometry.area}, ${
                    JSON.parse(localStorage.getItem('customerData')).geometry.place_name
                }`,
        );
    });

    return (
        <Wrapper>
            <div className='row mb-3'>
                <div className='col-2 col-md-auto'>
                    <Logo src={garageImg} alt='Hotel' />
                </div>
                <div
                    className='col row-cols-1 text-truncate ml-2'
                    style={{ maxWidth: '60%', borderBottom: '2px solid black' }}
                >
                    <div className='col'>
                        <Title>{garageName}</Title>
                    </div>
                    <div className='col text-truncate text-muted font-weight-light'>
                        {garageArea}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Hotel;
