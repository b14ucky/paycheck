import React from "react";
import { useNavigate } from 'react-router-dom'
import "./App.css";


export default function LoginPage() {
    
    const navigate = useNavigate();

    return (
        <main>
            <section className="login">
                <div className="loginTitle">
                    <a className="titleText">Login to your account</a>
                </div>
                <div className="loginSubtitle">
                    <a className="subtitleText">Enter your credentials</a>
                </div>
                <hr className="line" />
                <div className="loginForm">
                    <form method="post">
                        <div className="username">
                            <input type="text" name="Username" id="username" placeholder="Username" className="inputAnimation OnFocus inputField" autoComplete="username" />
                        </div>
                        <br /><br />
                        <div className="password">
                            <input type="password" name="password" id="password" placeholder="Password" className="inputAnimation OnFocus inputField" autoComplete="current-password" />
                        </div>
                        <br /><br />
                        <div className="loginButtonContainer">
                            <input type="submit" value="Log in" id="loginButton" className="buttonAnimation OnFocus button" />
                        </div>
                    </form>
                </div>
            </section>
            <section className="registerGoTo">
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