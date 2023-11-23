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
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setFirstName(response.data.user.first_name);
            setLastName(response.data.user.last_name);
            setGroups(response.data.user.groups);
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
                    <div style={{textAlign: "center", lineHeight: "50px", fontSize: "2rem"}}>
                        <p>{!groups.length ? "You are not assigned to any group. Please conntact an administrator!" : ''}</p>
                        <p>Hello {firstName} {lastName}</p>
                    </div>
                    <p>Please note this is a demo so you can style this page as you wish!</p>
                </div>
            </section>
        </main>
    );
}