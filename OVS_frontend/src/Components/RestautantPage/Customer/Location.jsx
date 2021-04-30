import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const City = styled.button`
    background: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 0px;
    border: 0px;
    border-bottom: 2px solid black;
    &:hover {
        cursor: pointer;
        color: #002D62;
        border-bottom: 2px solid #002D62;
    };
    .link{
        text-decoration:none;
        color:#002D62;
    }
    
`;

const useStyles = makeStyles({
    list: {
        width: 450,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const [area, setArea] = useState('');
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    useEffect(() => {
        if (window.localStorage.getItem('Coordinates') == null) {
            setArea('Bangaluru');
        } else {
            setArea(JSON.parse(window.localStorage.getItem('Coordinates')).area);
        }
    }, []);
    // console.log(area);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role='presentation'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            Location Search Bar and Locate Me
        </div>
    );

    return (
        <div>
            <City
                type='button'
                className='btn btn-md text-capitalize'
                // onClick={toggleDrawer('left', true)}
                onClick={toggleDrawer('left', false)}
            >
                <Link className="link"exact to="/">
                {area}
                </Link>
            </City>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}
