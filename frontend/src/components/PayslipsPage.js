import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Payslip from './Payslip.js';
import Navbar from "./Navbar.js";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function PayslipsPage() {
    
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [payslips, setPayslips] = useState([]);

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setFirstName(response.data.user.first_name);
            setLastName(response.data.user.last_name);
            displayPayslips(response.data.user.id);
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

    function displayPayslips(employeeId) {
        client.get(`/api/get-payslip/?employeeId=${employeeId}`)
            .then(response => {
                if (response.data === '') setPayslips([{id: null}]);
                else setPayslips(response.data);
            })
            .catch(error => console.log(error));
    }

    return (
        <main>
            <Navbar />
            <section className="mainWrapper">
                <header className="title">
                    <a className="titleText">Payslips</a>
                </header>
                <div className="main">
                    {payslips.map(payslip => (<Payslip key={payslip.id} payslip={payslip} />))}
                </div>
            </section>
        </main>
    );
}