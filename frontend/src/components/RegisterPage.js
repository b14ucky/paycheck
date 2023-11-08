import React, { useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function RegisterPage() {

    const navigate = useNavigate();
    
    const username = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    function submitRegister(event) {
        event.preventDefault();
        if (password.current.value === confirmPassword.current.value) {
            client.post(
                '/auth/register',
                {
                    username: username.current.value,
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    email: email.current.value,
                    password: password.current.value
                }
            ).then(response => {
                event.target.reset();
                navigate('/login/')
            })
        } 
    }

    return (
        <main>
            <section className="loginGoTo">
                <div className="loginTitle">
                    <a className="titleText">Already have an account?</a>
                </div>
                <div className="loginText">
                    <p className="paragraphText">Click the button below to log in to your account!</p>
                </div>
                <br /><br />
                <div className="loginButtonContainer">
                    <input type="button" value="Log in" id="loginButton" className="buttonAnimation OnFocus button" onClick={() => navigate('/login/')}/>
                </div>
            </section>
            <section className="register">
                <div className="registerTitle">
                    <a className="titleText">Create Account</a>
                </div>
                <div className="registerSubtitle">
                    <a className="subtitleText">Please fill in the form below</a>
                </div>
                <hr className="line" />
                <div className="registerForm">
                    <form onSubmit={event => submitRegister(event)}>
                        <div className="username">
                            <input ref={username} type="text" name="Username" id="username" placeholder="Username" className="registerInputField inputAnimation OnFocus inputField" autoComplete="username" />
                        </div>
                        <br />
                        <div className="inputSmallWrapper">
                            <div className="firstName">
                                <input ref={firstName} type="text" name="firstName" id="firstName" className="registerInputField inputAnimation OnFocus inputField inputSmall" placeholder="First Name" autoComplete="given-name" />
                            </div>
                            <div className="lastName">
                                <input ref={lastName} type="text" name="lastName" id="lastName" className="registerInputField inputAnimation OnFocus inputField inputSmall inputSmallLeft" placeholder="Last Name" autoComplete="family-name" />
                            </div>
                        </div>
                        <br />
                        <div className="email">
                            <input ref={email} type="email" name="email" id="email" className="registerInputField inputAnimation OnFocus inputField" placeholder="Email" autoComplete="email" />
                        </div>
                        <br />
                        <div className="inputSmallWrapper">
                            <div className="password1">
                                <input ref={password} type="password" name="password1" id="password1" className="registerInputField inputAnimation OnFocus inputField inputSmall" placeholder="Password" autoComplete="new-password" />
                            </div>
                            <div className="password2">
                                <input ref={confirmPassword} type="password" name="password2" id="password2" className="registerInputField inputAnimation OnFocus inputField inputSmall inputSmallLeft" placeholder="Confirm Password" autoComplete="new-password" />
                            </div>
                        </div>
                        <br />
                        <div className="createAccountContainer">
                            <input className="OnFocus button buttonAnimation" type="submit" id="createAccountButton" value="Create account" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}