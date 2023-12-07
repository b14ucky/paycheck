import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import InfoText from "./InfoText";
import Prompt from "./Prompt";

const client = axios.create();

export default function RegisterPage() {

    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [isPromptShown, setIsPromptShown] = useState(false);
    
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
                setIsPromptShown(true);
            }).catch(error => {
                if (error.response.data.username) {
                    setErrors(error.response.data.username);
                } else if (error.response.data.InvalidPassword) {
                    setErrors(error.response.data.InvalidPassword);
                } else if (error.response.data.email) {
                    setErrors(error.response.data.email);
                } else {
                    console.log(error);
                }
            });
        } else {
            setErrors(['Passwords must match!']);
        }
    }

    useEffect(() => {
        if (errors.length) setShowInfo(true);
    }, [errors]);

    function checkPasswords() {
        const passwordField = document.getElementById('password1');
        const confirmPasswordField = document.getElementById('password2');

        if (password.current.value !== confirmPassword.current.value) {
            passwordField.classList.add('invalidField');
            confirmPasswordField.classList.add('invalidField');
        } else {
            passwordField.classList.remove('invalidField');
            confirmPasswordField.classList.remove('invalidField');
        }
    }

    function hidePrompt() {
        setIsPromptShown(false);
    }

    function navigateToLogin() {
        navigate('/login/');
    }

    return (
        <main className="register">
            <section className="loginSection">
                <div className="loginTitle">
                    <a className="titleText">Already have an account?</a>
                </div>
                <div className="loginText">
                    <p className="paragraphText">Click the button below to log in to your account!</p>
                </div>
                <br /><br />
                <div className="loginButtonContainer">
                    <input type="button" value="Log in" id="loginButton" className="buttonAnimation OnFocus button" onClick={navigateToLogin}/>
                </div>
            </section>
            <section className="registerSection">
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
                                <input ref={firstName} type="text" name="firstName" id="firstName" className="registerInputField inputAnimation OnFocus inputField inputSmall" placeholder="First Name" autoComplete="given-name" required/>
                            </div>
                            <div className="lastName">
                                <input ref={lastName} type="text" name="lastName" id="lastName" className="registerInputField inputAnimation OnFocus inputField inputSmall inputSmallLeft" placeholder="Last Name" autoComplete="family-name" required/>
                            </div>
                        </div>
                        <br />
                        <div className="email">
                            <input ref={email} type="email" name="email" id="email" className="registerInputField inputAnimation OnFocus inputField" placeholder="Email" autoComplete="email" required/>
                        </div>
                        <br />
                        <div className="inputSmallWrapper">
                            <div className="password1">
                                <input ref={password} type="password" name="password1" id="password1" className="registerInputField inputAnimation OnFocus inputField inputSmall" placeholder="Password" autoComplete="new-password" required/>
                            </div>
                            <div className="password2">
                                <input ref={confirmPassword} type="password" name="password2" id="password2" className="registerInputField inputAnimation OnFocus inputField inputSmall inputSmallLeft" placeholder="Confirm Password" autoComplete="new-password" onChange={() => checkPasswords()} required/>
                            </div>
                        </div>
                        <br />
                        <InfoText errors={errors} shown={showInfo} />
                        <div className="createAccountContainer">
                            <input className="OnFocus button buttonAnimation" type="submit" id="createAccountButton" value="Create account" />
                        </div>
                    </form>
                </div>
            </section>
            <Prompt title="Account Created" message="Account created successfully!" click={hidePrompt} shown={isPromptShown} buttonClick={navigateToLogin} buttonLabel="Log in"/>
        </main>
    );
}