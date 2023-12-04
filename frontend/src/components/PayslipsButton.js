import React from "react";
import { useNavigate } from "react-router-dom";

export default function PayslipsButton({isEmployee, isAccountant, isAdmin}) {

    const navigate = useNavigate();

    if (isEmployee || isAccountant || isAdmin) {
        return (
            <div className="payslipsButtonContainer">
                <input type="button" value="Payslips" className="payslipsButton button buttonAnimation OnFocus" onClick={() => navigate('/payslips/')} />
            </div>
        );
    }
}