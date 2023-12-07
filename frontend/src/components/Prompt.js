import React from 'react';

export default function Prompt(props) {

    if (props.shown) {
        return (
            <div className="prompt">
                <div className="prompt__title">
                    <h3>{props.title}</h3>
                    <button onClick={props.click}>
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11083)"> <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#26292C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11083"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                    </button>
                </div>
                <div className="prompt__body">
                    <a>{props.message}</a>
                </div>
                <div className="prompt__footer">
                    <button className="prompt__button" onClick={props.buttonClick}>{props.buttonLabel}</button>
                </div>
            </div>
        );
    }
}