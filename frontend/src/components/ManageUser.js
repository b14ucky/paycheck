import React, { useEffect, useState } from "react";
import axios from 'axios';

const client = axios.create();

export default function ManageUser({user, isEmployee, isAccountant, isAdmin}) {
    
    const [inEmployeeGroup, setInEmployeeGroup] = useState();
    const [inAccountantGroup, setInAccountantGroup] = useState();
    const [inAdminGroup, setInAdminGroup] = useState();
    const [saved, setSaved] = useState(false);
    
    useEffect(() => {
        setInEmployeeGroup(isEmployee);
        setInAccountantGroup(isAccountant);
        setInAdminGroup(isAdmin);
    }, [isEmployee, isAccountant, isAdmin])

    function handleEmployeeGroup() {
        if (isEmployee && !inEmployeeGroup) {
            client.post('/auth/remove-from-group', {userId: user.id, groupName: 'employee'})
            .catch(error => console.log(error));
            return;
        }
        if (!isEmployee && inEmployeeGroup) {
            client.post('/auth/add-to-group', {userId: user.id, groupName: 'employee'})
            .catch(error => console.log(error));
            return;
        }
    }

    function handleAccountantGroup() {
        if (isAccountant && !inAccountantGroup) {
            client.post('/auth/remove-from-group', {userId: user.id, groupName: 'accountant'})
            .catch(error => console.log(error));
            return;
        }
        if (!isAccountant && inAccountantGroup) {
            client.post('/auth/add-to-group', {userId: user.id, groupName: 'accountant'})
            .catch(error => console.log(error));
            return;
        }
    }

    function handleAdminGroup() {
        if (isAdmin && !inAdminGroup) {
            client.post('/auth/remove-from-group', {userId: user.id, groupName: 'admin'})
            .catch(error => console.log(error));
            return;
        }
        if (!isAdmin && inAdminGroup) {
            client.post('/auth/add-to-group', {userId: user.id, groupName: 'admin'})
            .catch(error => console.log(error));
            return;
        }
    }

    function handleSave() {
        handleEmployeeGroup();
        handleAccountantGroup();
        handleAdminGroup();
        window.location.reload();
    }

    if (user.id === null) return <a className="text">Please Choose an Employee to Display</a>

    return (
        <div className="userContainer">
            <div className="userInfoContainer">
                <p className="text">Username: <span className="biggerText">{user.username}</span></p>
                <br />
                <p className="text">First Name: <span className="biggerText">{user.first_name}</span></p>
                <br />
                <p className="text">Last Name: <span className="biggerText">{user.last_name}</span></p>
            </div>
            <div className="userGroupsContainer">
                <p className="text">User Groups:</p>
                <br />
                <input type="checkbox" name="groups" id="employee" checked={inEmployeeGroup} onChange={() => setInEmployeeGroup(!inEmployeeGroup)} />
                <label className="label text" htmlFor="employee"> employee</label>
                <br />
                <input type="checkbox" name="groups" id="accountant" checked={inAccountantGroup} onChange={() => setInAccountantGroup(!inAccountantGroup)}/>
                <label className="label text" htmlFor="accountant"> accountant</label>
                <br />
                <input type="checkbox" name="groups" id="admin" checked={inAdminGroup} onChange={() => setInAdminGroup(!inAdminGroup)}/>
                <label className="label text" htmlFor="admin"> admin</label>
            </div>
            <div className="buttonsContainer">
                <div className="saveButtonContainer">
                    <input type="button" value="Save" className="saveButton button buttonAnimation OnFocus" onClick={() => handleSave()}/>
                </div>
                <br /><br />
                <div className="deleteButtonContainer">
                    <input type="button" value="Delete" className="deleteButton button buttonAnimation OnFocus" />
                </div>
            </div>
        </div>
    );
}