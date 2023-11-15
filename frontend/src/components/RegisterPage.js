import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function RegisterPage() {

    const navigate = useNavigate();

    const [promptVisible, setPromptVisible] = useState(false);
    const [errorPromptVisible, setErrorPromptVisible] = useState(false);
    const [passwordErrorPromptVisible, setPasswordErrorPromptVisible] = useState(false);
    
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
                setPromptVisible(true);
            }).catch(error => {
                console.log(error.response.data.InvalidPassword)
                if (error.response.data.username) {
                    const usernameField = document.getElementById('username');
                    usernameField.classList.add('invalidField');
                    setErrorPromptVisible(true);
                }
            });
        } else {
            setPasswordErrorPromptVisible(true);
        }
    }

    function checkPasswords() {
        const confirmPasswordField = document.getElementById('password2');

        if (password.current.value !== confirmPassword.current.value) {
            confirmPasswordField.classList.add('invalidField');
        } else {
            confirmPasswordField.classList.remove('invalidField');
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
                        <div className="createAccountContainer">
                            <input className="OnFocus button buttonAnimation" type="submit" id="createAccountButton" value="Create account" />
                        </div>
                    </form>
                </div>
            </section>
            <div className="blurBackground" style={{visibility: promptVisible ? 'visible' : 'hidden'}}>
                <div className="promptContainer" style={{transform: promptVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'}}>
                    <div className="prompt confirmationPrompt">
                        <div className="closeWrapper" onClick={() => setPromptVisible(false)}>
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#F6F6F3"><g id="SVGRepoBgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <g id="Menu / CloseLG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#F6F6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                        </div>
                        <svg fill="#F6F6F3" width="64px" height="64px" viewBox="0 0 32.00 32.00" enableBackground="new 0 0 32 32" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" stroke="#F6F6F3" strokeWidth="0.00032"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.064"></g><g id="SVGRepoIconCarrier"> <g id="Approved"> <g> <path d="M16,1C7.729,1,1,7.729,1,16s6.729,15,15,15s15-6.729,15-15S24.271,1,16,1z M16,29C8.832,29,3,23.168,3,16S8.832,3,16,3 s13,5.832,13,13S23.168,29,16,29z"></path> <path d="M23.317,10.27l-10.004,9.36l-4.629-4.332c-0.403-0.377-1.035-0.356-1.413,0.047c-0.377,0.403-0.356,1.036,0.047,1.413 l5.313,4.971c0.192,0.18,0.438,0.27,0.683,0.27s0.491-0.09,0.683-0.27l10.688-10c0.403-0.377,0.424-1.01,0.047-1.413 C24.353,9.913,23.719,9.892,23.317,10.27z"></path> </g> </g> <g id="Approved_1_"></g> <g id="FileApprove"></g> <g id="FolderApproved"></g> <g id="SecurityApproved"></g> <g id="CertificateApproved"></g> <g id="UserApproved"></g> <g id="IDCardApproved"></g> <g id="AndroidApproved"></g> <g id="PrivacyApproved"></g> <g id="Approved_2_"></g> <g id="MessageApproved"></g> <g id="UploadApproved"></g> <g id="DownloadApproved"></g> <g id="EmailApproved"></g> <g id="DataApproved"></g> </g></svg>
                        <br />
                        <br />
                        <a className="promptTitle">Account Successfully Created</a>
                        <br />
                        <br />
                        <input className="OnFocus button buttonAnimation" type="button" id="loginRedirect" value="Log in" onClick={() => navigate('/login/')}/>
                    </div>
                </div>
            </div>
            <div className="blurBackground" style={{visibility: errorPromptVisible ? 'visible' : 'hidden'}}>
                <div className="promptContainer" style={{transform: errorPromptVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'}}>
                    <div className="prompt errorPrompt">
                        <div className="closeWrapper" onClick={() => setErrorPromptVisible(false)}>
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#F6F6F3"><g id="SVGRepoBgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <g id="Menu / CloseLG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#F6F6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                        </div>
                        <svg fill="#F6F6F3" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 475.2 475.2" xmlSpace="preserve" stroke="#F6F6F3"><g id="SVGRepoBgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <g> <g> <path d="M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6 s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7 s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7 C468.6,170.8,468.6,304.4,386.5,386.5z"></path> <path d="M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1 l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4 c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z"></path> </g> </g> </g></svg>
                        <br />
                        <br />
                        <a className="promptTitle">Username Already Taken</a>
                    </div>
                </div>
            </div>
            <div className="blurBackground" style={{visibility: passwordErrorPromptVisible ? 'visible' : 'hidden'}}>
                <div className="promptContainer" style={{transform: passwordErrorPromptVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'}}>
                    <div className="prompt errorPrompt">
                        <div className="closeWrapper" onClick={() => setPasswordErrorPromptVisible(false)}>
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#F6F6F3"><g id="SVGRepoBgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <g id="Menu / CloseLG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#F6F6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                        </div>
                        <svg fill="#F6F6F3" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 475.2 475.2" xmlSpace="preserve" stroke="#F6F6F3"><g id="SVGRepoBgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <g> <g> <path d="M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6 s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7 s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7 C468.6,170.8,468.6,304.4,386.5,386.5z"></path> <path d="M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1 l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4 c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z"></path> </g> </g> </g></svg>
                        <br />
                        <br />
                        <a className="promptTitle">Both Passwords Must Match</a>
                    </div>
                </div>
            </div>
        </main>
    );
}