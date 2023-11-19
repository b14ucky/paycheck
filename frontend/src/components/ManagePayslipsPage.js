import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import axios from 'axios';
import ManagePayslip from './ManagePayslip';

export default function ManagePayslipsPage() {

    const client = axios.create();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [payslips, setPayslips] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);

    const id = useRef(null);

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setFirstName(response.data.user.first_name);
            setLastName(response.data.user.last_name);
            createSelectMenu();
        })
        .catch(error => navigate('/login/'))
    }, []);

    useEffect(() => {
        displayPayslips(employeeId);
    }, [employeeId]);

    function displayPayslips(employeeId) {
        client.get(`/api/get-payslip/?employeeId=${employeeId}`)
            .then(response => {
                if (response.data === '') setPayslips([{id: null}]);
                else setPayslips(response.data);
            })
            .catch(error => console.log(error));
    }

    function createSelectMenu() {

        const selectMenu = document.getElementById('selectMenu');

        client.get('/auth/users')
        .then(response => {
            const users = response.data.users;
            for (const user of users) {
                selectMenu.innerHTML += `<option value="${user.id}">${user.first_name} ${user.last_name}</option>`;
            }
        });
    }

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
                    <div className="managePayslipsButtonContainer">
                        <input type="button" value="Manage Payslips" className="payslipsButton button buttonAnimation OnFocus" onClick={() => navigate('/manage-payslips/')} />
                    </div>
                    <br /><br />
                    <div className="logoutButtonContainer">
                        <input type="button" value="Log out" className="logoutButton button buttonAnimation OnFocus" onClick={event => handleLogout(event)} />
                    </div>
                </div>
            </section>
            <section className="mainWrapper">
                <header className="title">
                    <a className="titleText">Manage Payslips</a>
                </header>
                <div className="selectionWrapper">
                    <div className="selectionContainer">
                        <a className="text">Employee Name: </a>
                        <div className="selectMenu">
                            <select className="selectEmployee" id="selectMenu" ref={id}></select>
                        </div>
                        <div className="searchContainer" onClick={() => setEmployeeId(id.current.value)}>
                            <svg width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns" fill="#7C7B79"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchtype="MSPage"> <g id="Icon-Set" sketchtype="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#7C7B79"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" sketchtype="MSShapeGroup"> </path> </g> </g> </g></svg>
                        </div>
                    </div>
                </div>
                <div className="main">
                    {payslips.map(payslip => (<ManagePayslip key={payslip.id} payslip={payslip} />))}
                </div>
            </section>
        </main>
    );
}