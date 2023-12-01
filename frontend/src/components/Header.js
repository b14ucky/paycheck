import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const client = axios.create();

export default function Header() {

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

    function handleUserInfo() {
        const userInfoContainer = document.querySelector('.userInfoContainer');
        const userInfo = document.querySelector('.userInfo');
        const showInfoButton = document.querySelector('.showInfoButton');
        if (showInfoButton.classList.contains('open')) {
            showInfoButton.classList.remove('open');
            showInfoButton.classList.add('close');
            userInfoContainer.classList.add('hidden');
            userInfoContainer.classList.remove('shown');
            userInfo.classList.add('hidden');
            userInfo.classList.remove('shown');
        } else {
            showInfoButton.classList.remove('close');
            showInfoButton.classList.add('open');
            userInfoContainer.classList.remove('hidden');
            userInfoContainer.classList.add('shown');
            userInfo.classList.remove('hidden');
            userInfo.classList.add('shown');
        }
    }

    function displayGroups() {
        if (groups.length === 0) {
            return (
                <li>You don't have any groups yet!</li>
            );
        }
        return groups.map(group => {
            return (
                <li key={group.name}>{group.name}</li>
            );
        });
    }
    return (
        <header className="topBar">
            <a className="titleText">Dashboard</a>
            <div className="userContainer">
                <div className="userIcon">
                    <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#4BBEA7"></path> <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#26292C"></path> <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#26292C"></path> </g></svg>
                    <div className="userInfoContainer hidden">
                        <div className="userInfo hidden">
                            <a className="nameText">{firstName} {lastName}</a> 
                            <hr className="lineSeparator" />
                            <p className="infoText">Your groups: </p>
                            <ul className="userGroups infoText">
                                {displayGroups()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="showInfoButton close" onClick={() => handleUserInfo()}>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#26292C"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 9L12 15L5 9" stroke="#26292C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
            </div>
        </header>
    );
}