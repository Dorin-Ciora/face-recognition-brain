import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';
 

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 52 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px', width:'90px', height:'90px'}} alt='brain' src={brain} />
                </div>
            </Tilt>

        </div>
    );
}

export default Logo;