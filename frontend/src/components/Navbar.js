import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CalculatorButton from './CalculatorButton';
import PayslipsButton from './PayslipsButton';
import ManagePayslipsButton from './ManagePayslipsButton';
import ManageUsersButton from './ManageUsersButton';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function Navbar() {

    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();
        client.post('/auth/logout')
        .then(response => {
            navigate('/login/');
        });
    }

    const [user, setUser] = useState();

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => navigate('/login/'))
    }, []);

    function isEmployee(user) {
        if (user !== undefined) {
            if (user.groups.length) {
                for (const group of user.groups) {
                    if (group.name === "employee") return true;
                }
            }
        }
        return false;
    }

    function isAccountant(user) {
        if (user !== undefined) {
            if (user.groups.length) {
                for (const group of user.groups) {
                    if (group.name === "accountant") return true;
                }
            }
        }
        return false;
    }

    function isAdmin(user) {
        if (user !== undefined) {
            if (user.groups.length) {
                for (const group of user.groups) {
                    if (group.name === "admin") return true;
                }
            }
        }
        return false;
    }

    return (
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
                    <input type="button" value="Dashboard" className="dashboardButton button buttonAnimation OnFocus" onClick={() => navigate('/dashboard/')} />
                </div>
                <PayslipsButton isEmployee={isEmployee(user)} isAccountant={isAccountant(user)} isAdmin={isAdmin(user)} />
                <CalculatorButton isAccountant={isAccountant(user)} isAdmin={isAdmin(user)} />
                <ManagePayslipsButton isAccountant={isAccountant(user)} isAdmin={isAdmin(user)} />
                <ManageUsersButton isAdmin={isAdmin(user)} />
                <div className="logoutButtonContainer">
                    <input type="button" value="Log out" className="logoutButton button buttonAnimation OnFocus" onClick={event => handleLogout(event)} />
                </div>
            </div>
        </section>
    );
}