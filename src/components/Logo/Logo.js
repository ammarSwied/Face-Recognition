import React from 'react';
import './Logo.css';
import logo from './logo.png';
const Logo = () => {


    return (
        <div className='ma4 mt0'>
            <div className='pa3'>
                <img className='grow pa4' src={logo} alt="Logo" width="200" height="200"/>
            </div>
        </div>
    );
}

export default Logo;