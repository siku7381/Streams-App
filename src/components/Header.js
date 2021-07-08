import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () =>{
    return (
        <div className='ui secondary pointing menu mt-4'>
            <Link className='item' to='/'>
                Streamy
            </Link>
            <div className='right menu'>
                <Link className='item' to='/'>
                    All Streams
                </Link>
                <Link className='item' to='/'>
                    <GoogleAuth />
                </Link>
            </div>
        </div>
    );
}


export default Header;