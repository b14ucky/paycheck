import React from "react";
import { useNavigate } from "react-router-dom";

export default function ManagePayslipsButton({isAccountant, isAdmin}) {

    const navigate = useNavigate();

    if (isAccountant || isAdmin) {
        return (
            <div className="managePayslipsButtonContainer">
                <input type="button" value="Manage Payslips" className="managePayslipsButton button buttonAnimation OnFocus" onClick={() => navigate('/manage-payslips/')} />
            </div>
        );
    }
}