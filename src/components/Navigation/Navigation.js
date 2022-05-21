import React from 'react';
import './Navigation.css';
const Navigation = ({ onRouteChange ,isSignedIn }) => {

    if(isSignedIn) {
        return (
            <div className='nav-signout'>
                <p onClick={() => onRouteChange('signin')} className='pa3 f2 underline link dim black pointer'>Signout</p>
            </div>
        );
    }
    else {
        return(
            <div className='nav-signout'>
                <p onClick={() => onRouteChange('signin')} className='pa3 f2 underline link dim black pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='pa3 f2 underline link dim black pointer'>Register</p>
            </div>
        );
    }


}

export default Navigation;