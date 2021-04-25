import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Customer/Login';
import Location from './Customer/Location';
import websiteLogo from '../../Pics and logo/LandingPage/WebSiteLogo.png';

const Wrapper = styled.div`
    overflow: hidden;
    padding: 10px 0;
    margin: 0;
    box-sizzing: border-box;
    font-family: sans-serif;
    .logo-container {
        padding: 10px;
    }

    .nav-item {
        padding: 10px 10px;
        .nav-link {
            text-decoration: none;
            color: #333;
            font-size: 1.1rem;
            font-weight: 500;
            &:hover {
                color: #002D62;
            }
        }
    }
    box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #fff;
    z-index: 1000;
`;

const Address = styled.button`
    border: 0px;
    margin: auto 0px;
    background: #fff;
    color: #686b78;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.2;
    letter-spacing: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
        cursor: pointer;
        color: #002D62;
    }
`;

const SVG = styled.svg`
    stroke: currentColor;
    fill: #002D62;
    stroke-width: 0;
    &:hover {
        transform: scale(1.05);
    }
`;

function CustomerName({ name }) {
    if (name.length < 2) {
        return <Login />;
    } else {
        return (
            <Link
                to='/my-account'
                type='button'
                className='nav-link btn btn-lg align-self-center text-capitalize'
            >
                <i className='fa fa-user mr-1'></i> {name}
            </Link>
        );
    }
}

function Navigator() {
    const [name, setName] = useState('');
    const [placeName, setPlaceName] = useState('');

    useEffect(() => {
        if (localStorage.getItem('customerData') == null) {
            setName('');
        } else {
            setName(JSON.parse(localStorage.getItem('customerData')).name);
        }

        if (localStorage.getItem('Coordinates') == null) {
            setPlaceName('Karnatak, India');
        } else {
            setPlaceName(
                JSON.parse(localStorage.getItem('Coordinates')).place_name,
            );
        }
    }, []);
    console.log(name);

    return (
        <Wrapper className='container-fluid shadow'>
            <div className='row'>
                <div className='col-lg-6  mt-0'>
                    <div className='logo-container-fluid'>
                        <ul className='list-inline'>
                            <li className='list-inline-item'>
                                <Link
                                    to='/Restaurants'
                                    type='button'
                                    className='btn btn-lg'
                                >
                                    <img src={websiteLogo} alt="website logo" style={{width:"55px",height:"50px"}}></img>
                                </Link>
                            </li>
                            <li className='list-inline-item '>
                                <Location />
                            </li>
                            <Address
                                className='list-inline-item text-truncate text-capitalize'
                                style={{ maxWidth: '230px' }}
                            >
                                {/* Karnatak, India */}
                                {placeName}
                            </Address>
                            <li className='list-inline-item'>
                                <button type='button' className='btn btn-sm'>
                                    <i
                                        className='fas fa-chevron-down'
                                        style={{ color: '#002D62' }}
                                    ></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='container'>
                        <nav className='d-flex'>
                            <div className='nav-item '>
                                <Link className='nav-link'>
                                    <i className='fa fa-search'></i> Search
                                </Link>
                            </div>
                            <div className='nav-item'>
                                <Link className='nav-link'>
                                <i class="fas fa-percentage"></i>
                                    Offer
                                </Link>
                            </div>
                            <div className='nav-item'>
                                <Link className='nav-link'>
                                    <i className='fa fa-support'></i> Help
                                </Link>
                            </div>
                            <div className='nav-item text-capitalize'>
                                {/* <Login /> */}
                                <CustomerName name={name} />
                            </div>
                            <div className='nav-item'>
                                <button
                                    type='button'
                                    class='btn'
                                    data-toggle='modal'
                                    data-target='#CartModal'
                                    className='nav-link'
                                    style={{
                                        border: 'none',
                                        background: 'white',
                                    }}
                                >
                                    <i className='fa fa-shopping-cart'></i> Cart
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Navigator;
