import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function CalculatorPage() {
    
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setFirstName(response.data.user.first_name);
            setLastName(response.data.user.last_name);
        })
        .catch(error => navigate('/login/'))
    }, []);

    function handleLogout(event) {
        event.preventDefault();
        client.post('/auth/logout')
        .then(response => {
            navigate('/login/');
        });
    }

    return (
        <main>
            <section className="navbar">
                <div className="iconWrapper">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#F6F6F3"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z" stroke="#F6F6F3" strokeWidth="1.5"></path> <path d="M18 8.49998H14M18 14.5H14M18 17.5H14M10 8.49999H8M8 8.49999L6 8.49999M8 8.49999L8 6.49998M8 8.49999L8 10.5M9.5 14.5L8.00001 16M8.00001 16L6.50001 17.5M8.00001 16L6.5 14.5M8.00001 16L9.49999 17.5" stroke="#F6F6F3" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
                <div className="buttonsWrapper">
                    <div className="lineWrapper">
                        <hr className="line" />
                    </div>
                    <br />
                    <div className="homeButtonContainer">
                        <input type="button" value="Dashboard" className="dashboardButton button buttonAnimation OnFocus" onClick={() => navigate('/dashboard/')}/>
                    </div>
                    <br /><br />
                    <div className="calculatorButtonContainer">
                        <input type="button" value="Calculator" className="calculatorButton button buttonAnimation OnFocus" onClick={() => navigate('/calculator/')} />
                    </div>
                    <br /><br />
                    <div className="payslipsButtonContainer">
                        <input type="button" value="Payslips" className="payslipsButton button buttonAnimation OnFocus" onClick={() => navigate('/payslips/')}/>
                    </div>
                    <br /><br />
                    <div className="logoutButtonContainer">
                        <input type="button" value="Log out" className="logoutButton button buttonAnimation OnFocus" onClick={event => handleLogout(event)} />
                    </div>
                </div>
            </section>
            <section className="mainWrapper">
                <header className="title">
                    <a className="titleText">Calculator</a>
                </header>
                <div className="main">
                    <form className="calculator" method="post">
                        <div className="calculatorTitle">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z" stroke="#3BA590" strokeWidth="1.5"></path> <path d="M18 8.49998H14M18 14.5H14M18 17.5H14M10 8.49999H8M8 8.49999L6 8.49999M8 8.49999L8 6.49998M8 8.49999L8 10.5M9.5 14.5L8.00001 16M8.00001 16L6.50001 17.5M8.00001 16L6.5 14.5M8.00001 16L9.49999 17.5" stroke="#3BA590" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                            <div className="textWrapper">
                                <a className="text">Salary calculator</a>
                            </div>
                        </div>
                        <br /><br />
                        <div className="numberOfHours">
                            <input type="number" name="numberOfHours" id="numberOfHours" placeholder="Number Of Hours" step="0.01" className="inputAnimation OnFocus inputField" />
                        </div>
                        <br /><br />
                        <div className="hourlyWage">
                            <input type="number" name="hourlyWage" id="hourlyWage" placeholder="Hourly Wage" step="0.01" className="inputAnimation OnFocus inputField" />
                        </div>
                        <br /><br />
                        <div className="costsOfGettingIncomeWrapper">
                            <a className="text">Costs Of Getting Income: </a>
                            <br />
                            <div className="radioWrapper">
                                <label htmlFor="costsOfGettingIncomeTrue" className="text">300 zł</label>
                                <input type="radio" name="costsOfGettingIncome" id="costsOfGettingIncomeTrue" value={300} className="OnFocus" />
                                <label htmlFor="costsOfGettingIncomeFalse" className="text">250 zł</label>
                                <input type="radio" name="costsOfGettingIncome" id="costsOfGettingIncomeFalse" value={250} className="OnFocus" defaultChecked />
                            </div>
                            <br />
                            <hr className="line" />
                        </div>
                        <br /><br />
                        <div className="calculateButtonContainer">
                            <input type="submit" value="Calculate" id="calculateButton" className="buttonAnimation OnFocus button" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}