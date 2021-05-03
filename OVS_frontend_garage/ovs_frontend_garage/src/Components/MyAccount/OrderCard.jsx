import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BillItems from '../CheckoutPage/Customer/BillItems';

const Wrapper = styled.div`
    font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
    letter-spacing: 0;
    color: #171a29;
    font-family: sans-serif;
    border: 1px solid #d4d5d9;
`;

const Image = styled.img`
    width: inherit;
`;

const Tick = styled.img`
    margin-left: 15px;
    height: 20px;
    width: 20px;
    vertical-align: text-bottom;
`;

const Name = styled.p`
    font-size: 20px;
    font-weight: 500;
    color: #171a29;
    margin-bottom: 0px;
    cursor: pointer;
    &:hover {
        color: #002D62;
    }
`;

const Info = styled.p`
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 0px;
    cursor: pointer;
`;

const Dets = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: #002D62;
    margin-bottom: 0px;
    cursor: pointer;
    &:hover {
        color: #171a29;
    }
`;

const Reorder = styled.button`
    font-size: 16px;
    font-weight: 600;
    border-radius: 0px;
    color: #fff;
    background: #002D62;
    &:hover {
        box-shadow: 0 2px 8px #d4d5d9;
        color: #fff;
    }
`;

const Help = styled.button`
    font-size: 16px;
    font-weight: 600;
    border-radius: 0px;
    border: 1px solid #002D62;
    color: #002D62;
    &:hover {
        box-shadow: 0 2px 8px #d4d5d9;
        color: #002D62;
    }
`;

const OrderCard = (props) => {
    const { data } = props;
    console.log('orders', data);
    const [handleCancel,sethandleCancel] = useState("pending");
    /* const [handleAcceptOrder,sethandleAcceptOrder] = useState("pending");
    const [handlePaymentDone,sethandlePaymentDone] = useState("processing");  */      
    const handleCancelOrder=(id)=>{
        axios.patch(`http://localhost:9000/api/v1/orders/${id}`,{
            "orderStatus": "rejected"
        }).then((res)=>{
            sethandleCancel(res.data.data.orderStatus);
            
        })
    }
    const handleAcceptOrder=(id)=>{
        axios.patch(`http://localhost:9000/api/v1/orders/${id}`,{
            "orderStatus": "processing"
        }).then((res)=>{
            sethandleCancel(res.data.data.orderStatus);
            
        })

    }
    const handlePaymentDone=(id)=>{
        axios.patch(`http://localhost:9000/api/v1/orders/${id}`,{
            "orderStatus": "completed"
        }).then((res)=>{
            sethandleCancel(res.data.data.orderStatus);
        })

    }
    const showGarageStatus =(handleCancel)=>{
        if(handleCancel == "pending"){
            return (<i class="fas fa-clock" style={{color:"orange",marginLeft:"10px"}}></i>)
        }
        else if(handleCancel == "processing"){
            return (<i class="fas fa-hourglass" style={{color:"#002D62",marginLeft:"10px"}}></i>)
        }
        else if(handleCancel == "rejected"){
            return (<i class="fas fa-frown" style={{color:"red",marginLeft:"10px"}}></i>)
        }
        else if(handleCancel == "completed"){
            return(<i class="fas fa-check-circle" style={{color:"green",marginLeft:"10px"}}></i>)
        }
        else if(handleCancel == "reviewed"){
            return(<i class="fas fa-check-double" style={{color:"green",marginLeft:"10px"}}></i>)
        }
    }
    const buttons=(handleCancel)=>{
        if(handleCancel == "pending"){
            return (
            <div className="col">
            <Help
                type='button'
                className='btn col-2 p-2 mr-4 text-uppercase'
                onClick={()=>handleAcceptOrder(data._id)}
                style={{color:"white",backgroundColor:"green",border:"1px solid green"}}
            >
                Accept order
            </Help>
            
            
            <Help
                type='button'
                className='btn col-2 p-2 mr-4 text-uppercase'
                onClick={()=>handleCancelOrder(data._id)}
                style={{color:"white",backgroundColor:"red",border:"1px solid red"}}
            >
                Cancel order
            </Help>
            </div>
            )
        }
        else if(handleCancel == "processing"){
            return (
            <div className="col">
                <Help
                type='button'
                className='btn col-2 p-2 mr-4 text-uppercase'
                onClick={()=>handleCancelOrder(data._id)}
                style={{color:"white",backgroundColor:"red",border:"1px solid red"}}
            >
                Cancel order
            </Help>
            <Help
                type='button'
                className='btn col-2 p-2 mr-4 text-uppercase'
                onClick={()=>handlePaymentDone(data._id)}
                style={{color:"white",backgroundColor:"green",border:"1px solid green"}}
            >
                Payment Done
            </Help>
            </div>)
        }
        else if(handleCancel == "rejected"){
            return (<p>You have canceled this order</p>)
        }
        else if(handleCancel == "completed"){
            return(
                <p>Customer hasn't reviewed yet</p>
            )
        }
        else if(handleCancel == "reviewed"){
            return(
                <p>Customer rated you | {data.review.rating} <i class="fas fa-star" style={{color:"	#FFD700"}}></i></p>
            )
        }

    }
    const showCard=()=>{
        if(data.orderStatus == "rejected" || data.orderStatus == "reviewed"){
            return(
                <Wrapper className='container text-left mb-5'>
            <div className='row p-4'>
                {/* <div className='col-3 pl-0'>
                    <Image src={data.garage.img_url} alt='Hotel' />
                </div> */}
                
                <i class="fas fa-user col-1" style={{color:"#002D62" ,fontSize:"2rem",marginTop:"2px"}}></i>
                <div className='col row-cols-1 pl-0'>
                    <div className='col'>
                        <div className='row justify-content-between'>
                            <div className='col-md-auto'>
                            <span> <span style={{fontSize:"1.5rem"}}>{data.user.name}</span> | <i class="fas fa-phone-alt" style={{fontSize:"16px"}}></i> {data.user.phonenumber} | <i class="fas fa-envelope" style={{fontSize:"16px"}}></i> {data.user.email}</span> 
                            </div>
                            <div className='col-md-auto text-right mt-1 text-muted'>
                                {data.orderStatus}
                                {showGarageStatus(data.orderStatus)}  
                            </div>
                        </div>
                    </div>
                    <div className='col text-capitalize text-muted'>
                        <Info>
                            ORDER #{data._id} | {data.createdAt}
                        </Info>
                    </div>
                    <div className='col mt-3'>
                        {data.userAddress.flat_no} {", "} {data.userAddress.landmark} {", "}{data.userAddress.place_name}
                    </div>
                </div>
            </div>
            <div className='row-cols-1'>
                <div
                    className='col mt-3 mb-3'
                    style={{ border: '1px dashed #d4d5d9' }}
                ></div>
                <div className='col' style={{ fontWeight: 300 }}>
                    {data.serviceList.map((item) => (
                        <BillItems data={item} />
                    ))}
                </div>

                <div className='col'>
                    <div className='row justify-content-end'>
                        <div
                            className='col-md-auto text-right text-muted'
                            style={{ borderTop: '2px solid #d4d5d9' }}
                        >
                            Total Paid: ₹{' '}
                            {data.serviceList.reduce(
                                (a, b) => a + b.qty * b.price,
                                50,
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className='col mt-3 mb-3'
                    style={{ border: '1px dashed #d4d5d9' }}
                ></div>
                <div className='col mb-4'>
                    <div className='row ml-1'> 
                        {buttons(data.orderStatus)}
                    </div>
                </div>
            </div>
        </Wrapper>
            )
        }
        else{
            return(
                <Wrapper className='container text-left mb-5'>
            <div className='row p-4'>
                {/* <div className='col-3 pl-0'>
                    <Image src={data.garage.img_url} alt='Hotel' />
                </div> */}
                
                <i class="fas fa-user col-1" style={{color:"#002D62" ,fontSize:"2rem",marginTop:"2px"}}></i>
                <div className='col row-cols-1 pl-0'>
                    <div className='col'>
                        <div className='row justify-content-between'>
                            <div className='col-md-auto'>
                            <span> <span style={{fontSize:"1.5rem"}}>{data.user.name}</span> | <i class="fas fa-phone-alt" style={{fontSize:"16px"}}></i> {data.user.phonenumber} | <i class="fas fa-envelope" style={{fontSize:"16px"}}></i> {data.user.email}</span> 
                            </div>
                            <div className='col-md-auto text-right mt-1 text-muted'>
                                {handleCancel}
                                {showGarageStatus(handleCancel)}  
                            </div>
                        </div>
                    </div>
                    <div className='col text-capitalize text-muted'>
                        <Info>
                            ORDER #{data._id} | {data.createdAt}
                        </Info>
                    </div>
                    <div className='col mt-3'>
                        {data.userAddress.flat_no} {", "} {data.userAddress.landmark} {", "}{data.userAddress.place_name}
                    </div>
                </div>
            </div>
            <div className='row-cols-1'>
                <div
                    className='col mt-3 mb-3'
                    style={{ border: '1px dashed #d4d5d9' }}
                ></div>
                <div className='col' style={{ fontWeight: 300 }}>
                    {data.serviceList.map((item) => (
                        <BillItems data={item} />
                    ))}
                </div>

                <div className='col'>
                    <div className='row justify-content-end'>
                        <div
                            className='col-md-auto text-right text-muted'
                            style={{ borderTop: '2px solid #d4d5d9' }}
                        >
                            Total Paid: ₹{' '}
                            {data.serviceList.reduce(
                                (a, b) => a + b.qty * b.price,
                                50,
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className='col mt-3 mb-3'
                    style={{ border: '1px dashed #d4d5d9' }}
                ></div>
                <div className='col mb-4'>
                    <div className='row ml-1'> 
                        {buttons(handleCancel)}
                    </div>
                </div>
            </div>
        </Wrapper>
            )
        }
    }
    return (
        showCard()
    );
};

export default OrderCard;
