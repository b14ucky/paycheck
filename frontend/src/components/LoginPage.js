import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import InfoText from "./InfoText";

const client = axios.create();

export default function LoginPage() {
        
    const navigate = useNavigate();

    const username = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    function submitLogin(event) {
        event.preventDefault();
        client.post(
            '/auth/login',
            {
                username: username.current.value,
                password: password.current.value
            }
        ).then(response => {
            event.target.reset();
            navigate('/dashboard/')
        }).catch(error => {
            if (error.response.data.InvalidCredentials) setErrors([error.response.data.InvalidCredentials]);
            else console.log(error);
        });
    }

    useEffect(() => {
        if (errors.length) setShowInfo(true);
    }, [errors]);

    return (
        <main className="login">
            <section className="loginSection">
                <div className="loginTitle">
                    <a className="titleText">Login to your account</a>
                </div>
                <div className="loginSubtitle">
                    <a className="subtitleText">Enter your credentials</a>
                </div>
                <hr className="line" />
                <div className="loginForm">
                    <form onSubmit={event => submitLogin(event)}>
                        <div className="username">
                            <input type="text" name="Username" id="username" placeholder="Username" className="inputAnimation OnFocus inputField" autoComplete="username" ref={username} required/>
                        </div>
                        <br /><br />
                        <div className="password">
                            <input type="password" name="password" id="password" placeholder="Password" className="inputAnimation OnFocus inputField" autoComplete="current-password" ref={password} required/>
                        </div>
                        <br />
                        <InfoText errors={errors} shown={showInfo}/>
                        <div className="loginButtonContainer">
                            <input type="submit" value="Log in" id="loginButton" className="buttonAnimation OnFocus button" />
                        </div>
                    </form>
                </div>
            </section>
            <section className="registerSection">
                <div className="registerTitle">
                    <a className="titleText">New Here?</a>
                </div>
                <div className="registerText">
                    <p className="paragraphText">Click the button below to create your account!</p>
                </div>
                <div className="createAccountContainer">
                    <input className="OnFocus button buttonAnimation" type="button" id="createAccountButton" value="Create account" onClick={() => navigate('/register/')}/>
                </div>
            </section>
        </main>
    );
}