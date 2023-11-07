import React from "react";
import { useNavigate } from "react-router";


export default function RegisterPage() {

    const navigate = useNavigate();

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
                    <form method="post">
                        <div className="username">
                            <input type="text" name="Username" id="username" placeholder="Username" className="registerInputField inputAnimation OnFocus inputField" autoComplete="username" />
                        </div>
                        <br />
                        <div className="firstName">
                            <input type="text" name="firstName" id="firstName" className="registerInputField inputAnimation OnFocus inputField" placeholder="First Name" autoComplete="given-name" />
                        </div>
                        <br />
                        <div className="lastName">
                            <input type="text" name="lastName" id="lastName" className="registerInputField inputAnimation OnFocus inputField" placeholder="Last Name" autoComplete="family-name" />
                        </div>
                        <br />
                        <div className="password1">
                            <input type="password" name="password1" id="password1" className="registerInputField inputAnimation OnFocus inputField" placeholder="Password" autoComplete="new-password" />
                        </div>
                        <br />
                        <div className="password2">
                            <input type="password" name="password2" id="password2" className="registerInputField inputAnimation OnFocus inputField" placeholder="Confirm Password" autoComplete="new-password" />
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