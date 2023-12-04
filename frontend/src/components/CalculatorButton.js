import React from "react";
import { useNavigate } from "react-router-dom";

export default function CalculatorButton({isAccountant, isAdmin}) {

    const navigate = useNavigate();

    if (isAccountant || isAdmin) {
        return (
            <div className="calculatorButtonContainer">
                <input type="button" value="Calculator" className="calculatorButton button buttonAnimation OnFocus" onClick={() => navigate('/calculator/')} />
            </div>
        );
    }
}