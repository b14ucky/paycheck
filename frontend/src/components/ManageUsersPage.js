import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ManageUser from './ManageUser';
import Header from './Header';

const client = axios.create();

export default function ManageUsersPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [users, setUsers] = useState([]);
    const [employeeId, setEmployeeId] = useState();
    const [user, setUser] = useState({id: null});

    const id = useRef(null);

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            if (!handlePermissions(response.data.user)) navigate('/dashboard/')
            setFirstName(response.data.user.first_name);
            setLastName(response.data.user.last_name);
            createSelectMenu();
        })
        .catch(error => navigate('/login/'))
    }, []);

    function handlePermissions(user) {
        if (!user.groups.length) return false;
        if (user.groups.length) {
            for (const group of user.groups) {
                if (group.name === "admin") return true;
            }
        }
        return true;
    }

    useEffect(() => {
        displayInfo(employeeId);
    }, [employeeId]);

    function displayInfo(employeeId) {
        for (const user of users) {
            if (user.id == employeeId) {
                setUser(user);
            }
        }
    }

    function createSelectMenu() {

        const selectMenu = document.getElementById('selectMenu');

        client.get('/auth/users')
        .then(response => {
            const users = response.data.users;
            for (const user of users) {
                selectMenu.innerHTML += `<option value="${user.id}">${user.first_name} ${user.last_name}</option>`;
            }
            setUsers(users);
        });
    }

    function isEmployee(user) {
        if (user.groups !== undefined) {
            if (user.groups.length) {
                for (const group of user.groups) {
                    if (group.name === "employee") return true;
                }
            }
        }
        return false;
    }

    function isAccountant(user) {
        if (user.groups !== undefined) {
            if (user.groups.length) {
                for (const group of user.groups) {
                    if (group.name === "accountant") return true;
                }
            }
        }
        return false;
    }

    function isAdmin(user) {
        if (user.groups !== undefined) {
            if (user.groups.length) {
                for (const group of user.groups) {
                    if (group.name === "admin") return true;
                }
            }
        }
        return false;
    }

    return (
        <main className="manageUsers">
            <Navbar />
            <section className="mainWrapper">
                <Header title="Manage Users" />
                <div className="selectionContainer">
                    <a className="text">Employee Name: </a>
                    <div className="selectMenu">
                        <select className="selectEmployee" id="selectMenu" ref={id}></select>
                    </div>
                    <div className="searchContainer" onClick={() => setEmployeeId(id.current.value)}>
                        <svg width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns" fill="#7C7B79"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepoTracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepoIconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchtype="MSPage"> <g id="Icon-Set" sketchtype="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#7C7B79"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" sketchtype="MSShapeGroup"> </path> </g> </g> </g></svg>
                    </div>
                </div>
                <div className="main">
                    <ManageUser user={user} isEmployee={isEmployee(user)} isAccountant={isAccountant(user)} isAdmin={isAdmin(user)}/>
                </div>
            </section>
        </main>
    );
}