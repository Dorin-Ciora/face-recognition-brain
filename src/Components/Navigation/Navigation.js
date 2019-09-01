import React from 'react';

const Navigation = ({ onRouteChange, isSingIn }) => {
        if (isSingIn) {
            return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p  onClick={() => onRouteChange('singout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
            );
        } else {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p  onClick={() => onRouteChange('singin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p  onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
            );
            }
}

export default Navigation;