import React from "react";
import { useNavigate } from "react-router-dom";

export default function ManageUsersButton({isAdmin}) {

    const navigate = useNavigate();

    if (isAdmin) {
        return (
            <div className="manageUsersButtonContainer">
                <input type="button" value="Manage Users" className="manageUsersButton button buttonAnimation OnFocus" onClick={() => navigate('/manage-users/')} />
            </div>
        );
    }
}