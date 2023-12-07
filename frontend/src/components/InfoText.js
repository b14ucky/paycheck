import React from 'react';

export default function InfoText(props) {
    
    if (props.shown) {
        return (
            <div className="infoTextContainer">
                {props.errors.map((error, index) => (<p className="infoText" key={index}>{error}</p>))}
            </div>
        );
    }
}