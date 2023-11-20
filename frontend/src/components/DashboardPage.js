import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './App.css';
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function DashboardPage() {

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

    return (
        <main>
            <Navbar />
            <section className="mainWrapper">
                <header className="title">
                    <a className="titleText">Dashboard</a>
                </header>
                <div className="main">
                    <div>
                        <p>Please note this is a demo so you can style this page as you wish!<br />Hello {firstName} {lastName}</p>
                        <blockquote id="blockquote">
                            
                        </blockquote>
                    </div>
                </div>
            </section>
        </main>
    );
}