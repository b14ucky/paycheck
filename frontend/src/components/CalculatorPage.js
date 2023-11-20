import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Navbar from "./Navbar";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function CalculatorPage() {
    
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [promptVisible, setPromptVisible] = useState(false);

    const hoursWorked = useRef(null);
    const hourlyWage = useRef(null);
    const username = useRef(null);
    const costsOfGettingIncome = useRef(null);

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setFirstName(response.data.user.first_name);
            setLastName(response.data.user.last_name);
        })
        .catch(error => navigate('/login/'))
        createSelectMenu();
    }, []);

    function handleLogout(event) {
        event.preventDefault();
        client.post('/auth/logout')
        .then(response => {
            navigate('/login/');
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        client.post(
            '/api/create-payslip/',
            {
                hoursWorked: hoursWorked.current.value,
                hourlyWage: hourlyWage.current.value,
                username: username.current.value,
                costsOfGettingIncome: costsOfGettingIncome.current.value
            }
        ).then(response => {
            event.target.reset();
            setPromptVisible(true);
        })
        .catch(error => console.log(error))
    }
    
    function createSelectMenu() {

        const selectMenu = document.getElementById('selectMenu');

        client.get('/auth/users')
        .then(response => {
            const users = response.data.users;
            for (const user of users) {
                selectMenu.innerHTML += `<option value="${user.username}">${user.first_name} ${user.last_name}</option>`;
            }
        });
    }


    return (
        <main>
            <Navbar />
            <section className="mainWrapper">
                <header className="title">
                    <a className="titleText">Calculator</a>
                </header>
                <div className="main">
                    <form className="calculator" onSubmit={event => handleSubmit(event)}>
                        <div className="calculatorTitle">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z" stroke="#3BA590" strokeWidth="1.5"></path> <path d="M18 8.49998H14M18 14.5H14M18 17.5H14M10 8.49999H8M8 8.49999L6 8.49999M8 8.49999L8 6.49998M8 8.49999L8 10.5M9.5 14.5L8.00001 16M8.00001 16L6.50001 17.5M8.00001 16L6.5 14.5M8.00001 16L9.49999 17.5" stroke="#3BA590" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                            <div className="textWrapper">
                                <a className="text">Salary calculator</a>
                            </div>
                        </div>
                        <br /><br />
                        <div className="hoursWorked">
                            <input type="number" name="hoursWorked" id="hoursWorked" placeholder="Hours Worked" step="0.01" className="inputAnimation OnFocus inputField" ref={hoursWorked}/>
                        </div>
                        <br /><br />
                        <div className="hourlyWage">
                            <input type="number" name="hourlyWage" id="hourlyWage" placeholder="Hourly Wage" step="0.01" className="inputAnimation OnFocus inputField" ref={hourlyWage}/>
                        </div>
                        <br /><br />
                        <div className="selectionWrapper">
                            <div className="selectionContainer">
                                <a className="text">Employee Name: </a>
                                <div className="selectMenu">
                                    <select className="selectEmployee" id="selectMenu" ref={username}></select>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="costsOfGettingIncomeWrapper">
                            <a className="text">Costs Of Getting Income: </a>
                            <br />
                            <div className="radioWrapper">
                                <label htmlFor="costsOfGettingIncomeTrue" className="text">300 zł</label>
                                <input type="radio" name="costsOfGettingIncome" id="costsOfGettingIncomeTrue" value={300} className="OnFocus" ref={costsOfGettingIncome}/>
                                <label htmlFor="costsOfGettingIncomeFalse" className="text">250 zł</label>
                                <input type="radio" name="costsOfGettingIncome" id="costsOfGettingIncomeFalse" value={250} className="OnFocus" defaultChecked ref={costsOfGettingIncome}/>
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
            <div className="blurBackground" style={{visibility: promptVisible ? 'visible' : 'hidden'}}>
                <div className="promptContainer" style={{transform: promptVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'}}>
                    <div className="prompt confirmationPrompt">
                        <div className="closeWrapper" onClick={() => setPromptVisible(false)}>
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#F6F6F3"><g id="SVGRepoBgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <g id="Menu / CloseLG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#F6F6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                        </div>
                        <svg fill="#F6F6F3" width="64px" height="64px" viewBox="0 0 32.00 32.00" enableBackground="new 0 0 32 32" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" stroke="#F6F6F3" strokeWidth="0.00032"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.064"></g><g id="SVGRepoIconCarrier"> <g id="Approved"> <g> <path d="M16,1C7.729,1,1,7.729,1,16s6.729,15,15,15s15-6.729,15-15S24.271,1,16,1z M16,29C8.832,29,3,23.168,3,16S8.832,3,16,3 s13,5.832,13,13S23.168,29,16,29z"></path> <path d="M23.317,10.27l-10.004,9.36l-4.629-4.332c-0.403-0.377-1.035-0.356-1.413,0.047c-0.377,0.403-0.356,1.036,0.047,1.413 l5.313,4.971c0.192,0.18,0.438,0.27,0.683,0.27s0.491-0.09,0.683-0.27l10.688-10c0.403-0.377,0.424-1.01,0.047-1.413 C24.353,9.913,23.719,9.892,23.317,10.27z"></path> </g> </g> <g id="Approved_1_"></g> <g id="FileApprove"></g> <g id="FolderApproved"></g> <g id="SecurityApproved"></g> <g id="CertificateApproved"></g> <g id="UserApproved"></g> <g id="IDCardApproved"></g> <g id="AndroidApproved"></g> <g id="PrivacyApproved"></g> <g id="Approved_2_"></g> <g id="MessageApproved"></g> <g id="UploadApproved"></g> <g id="DownloadApproved"></g> <g id="EmailApproved"></g> <g id="DataApproved"></g> </g></svg>
                        <br />
                        <br />
                        <a className="promptTitle">Payslip Successfully Created</a>
                        <br />
                        <br />
                        <input className="OnFocus button buttonAnimation" type="button" id="downloadPDFButton" value="Download PDF" />
                    </div>
                </div>
            </div>
        </main>
    );
}