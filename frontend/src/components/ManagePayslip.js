import React, { useState } from "react";
import axios from 'axios';

const client = axios.create();

export default function ManagePayslipsList(props) {
    
    const [shouldRender, setShouldRender] = useState(true);
    
    function handleDelete(payslipId) {
        client.post('/api/delete-payslip/', {id: payslipId})
        .catch(error => console.log(error));
        setShouldRender(false);
    }
    
    if (props.payslip.id === null) return <a className="textInfo">No payslips to display!</a>

    if (shouldRender) {
        return (
            <div className="payslipContainer">
                <div className="payslipId">
                    <a className="text">Payslip ID: {props.payslip.id}</a>
                </div>
                <div className="managePayslip">
                    <div className="payslipContent">
                        <div className="salariesContainer">
                            <div className="salaryText">
                                <a className="text">Net Pay:</a>
                                <a className="number">{props.payslip.netPay} PLN</a>
                            </div>
                            <div className="salaryText">
                                <a className="text">Gross Pay:</a>
                                <a className="number">{props.payslip.grossPay} PLN</a>
                            </div>
                        </div>
                        <div className="dateOfPreparation">
                            <a className="text">Date Of Preparation: {props.payslip.dateOfPreparation}</a>
                        </div>
                    </div>
                    <div className="deleteButtonContainer">
                        <input type="button" value="Delete" className="button buttonAnimation OnFocus deletePayslipButton" onClick={() => handleDelete(props.payslip.id)} />
                    </div>
                </div>
            </div>
        );
    }
}