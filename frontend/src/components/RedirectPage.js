import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create();

export default function RedirectPage() {

    const navigate = useNavigate();

    useEffect(() => {
        client.get('/auth/user')
        .then(response => navigate('/dashboard/'))
        .catch(error => navigate('/login/'))
    }, []);

    return (
        <div>
            <h1>Hold On!</h1>
            <p>You're being redirected to another page...</p>
        </div>
    );
}