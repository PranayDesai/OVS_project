import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import GarageCard from './GarageCard';
var axios = require('axios');

const Wrapper = styled.div`
    color: #171a29;
    /* // border: 1px solid black; */
    font-family: sans-serif;

    h3 {
        margin: 0px 0px 10px 0px;
        font-weight: bolder;
    }

    .big-box {
        padding: 40px 0px 25px 0px;
    }

    .list-inline-item {
        font-size: 16px;
        font-weight: 300;
        line-height: 1.2;
        color: #686b78;
        cursor: pointer;
        border-radius: 0px;
        &:hover {
            border-bottom: 1px solid black;
        }
    }

    .filter {
        color: black;
    }

    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
`;

const Equal = styled.img`
    width: 34px;
    height: 34px;
    border: 1px solid transparent;
    border-radius: 50%;
    margin-right: 16px;
    cursor: pointer;
    margin-left: 2px;
    box-shadow: 0 1px 4px 0 rgba(40, 44, 63, 0.4);
`;

const SortGarages = (props) => {
    console.log('props', props.filter, typeof props.filter);
    // const { filter } = props.filter;
    const history = useHistory();
    const [data, setData] = useState([]);
    const [totalRestaurants, setTotalRestaurants] = useState();
    const [filter, setFilter] = useState('');
    const customerData = JSON.parse(window.localStorage.getItem("customerData"));
    // useEffect(() => {
    // setFilter(props.filter);
    // }, []);

    useEffect(() => {
        setFilter(props.filter);
        console.log('just checking', filter);
        var config = {
            method: 'get',
            url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                console.log('in use effect', response.data.garages);
                setData(response.data.garages);
                setTotalRestaurants(response.data.total);
                console.log(totalRestaurants);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }, []);

    const allData = () => {
        var config = {
            method: 'get',
            url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,
            headers: {},
        };
        
        axios(config)
            .then(function (response) {
                // console.log(response.data.current);
                setData(response.data.current);
                history.push('/temp');
                history.push('/Restaurants');
                // history.goBack();
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    console.log(data);

    const filterData = (sort) => {
        var config = {
            method: 'get',
            url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data.current);
                setData(response.data.current);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    return (
        <Wrapper>
            <div className='container-fluid '>
                <div className='big-box align-self-center'>
                    <div
                        className='row mb-0 pb-0'
                        style={{ borderBottom: '3px solid whitesmoke' }}
                    >
                        <div className='col-lg-8'>
                            <h3 className='text-left'>
                                <button
                                    className='btn btn-sm'
                                    onClick={allData}
                                >
                                   {/*  <i class="fas fa-equals"></i> */}
                                </button>
                                {totalRestaurants} Garages
                            </h3>
                        </div>

                       {/*  <ul className='list-inline'>
                            <button
                                className='list-inline-item btn'
                                onClick={() => filterData('two-wheeler-only')}
                            >
                                Relevance
                            </button>
                            <button
                                className='btn list-inline-item'
                                onClick={() => filterData('newly-added')}
                            >
                                Cost for Two
                            </button>
                            <button
                                className='list-inline-item btn'
                                onClick={() => filterData('four-wheeler-only')}
                            >
                                Rating
                            </button>
                            <button className='list-inline-item btn filter'>
                                Filters
                                <img
                                    src='Icons/filter.svg'
                                    alt='filter icon'
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        border: '1.5px solid #fc8019 ',
                                        borderRadius: '50%',
                                        marginLeft: '8px',
                                    }}
                                />
                            </button>
                        </ul> */}
                    </div>
                </div>
            </div>
            <div
                className='row row-cols-4'
                style={{
                    width: '100%',
                    margin: 'auto',
                }}
            >
                {data.map((item) => (
                    <GarageCard data={item} key={item._id} />
                ))}
            </div>
        </Wrapper>
    );
};



export default SortGarages;


