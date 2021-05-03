import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WebSiteLogo from '../../Pics and logo/LandingPage/WebSiteLogo.png';

const Wrapper = styled.div`
    overflow: hidden;
    padding: 10px 0;
    /* // background: #fff;
    // box-shadow: 2px 0px 5px #e3e3e3; */
    margin: 0;
    box-sizzing: border-box;
    font-family: sans-serif;

    .logo-container {
        padding: 10px;
    }

   /*  div {
        // border: 1px solid red;
    } */

    .nav-item {
        padding: 10px 10px;
        .nav-link {
            text-decoration: none;
            color: #333;
            font-size: 17px;
            font-weight: 500;
            &:hover {
                color: #002d62;
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



const Li = styled.li`
    font-weight: 700;
    color: #3d4152;
    text-transform: uppercase;
    font-size: 14px;
`;

function MyAccNavigator() {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(JSON.parse(localStorage.getItem('garageData')).name);
    }, []);
    console.log(name);

    return (
        <Wrapper className='container-fluid shadow'>
            <div className='row justify-content-between'>
                <div className='col-md-auto mt-0'>
                    <div className='logo-container-fluid'>
                        <ul className='list-inline ml-5'>
                            <li className='list-inline-item'>
                                <Link
                                    to='/'
                                    type='button'
                                    className='btn btn-lg ml-4'
                                >
                                    <img src={WebSiteLogo} alt="websitelogo" style={{width:"55px"}}/>
                                </Link>
                            </li>
                            <Li className='list-inline-item text-uppercase'>
                                My Account
                            </Li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='container pl-0 pr-4'>
                        <nav className='d-flex justify-content-end mr-5 '>
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
                                <button
                                    type='button'
                                    className='nav-link btn btn-lg align-self-center text-capitalize'
                                    style={{ color: '#002d62' }}
                                >
                                    <i className='fa fa-user mr-1'></i> {name}
                                </button>
                            </div>
                            <div className='nav-item'>
                                <Link className='nav-link'>
                                    <i className='fa fa-shopping-cart'></i> Cart
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default MyAccNavigator;
