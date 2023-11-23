import React from "react";
import axios from 'axios';

import FileDownload from 'js-file-download';

const client = axios.create();

export default function ManagePayslipsList(props) {
        
    function handleDownload(payslipId) {
        client.post('/api/download-payslip/', {'id': payslipId}, {responseType: 'blob'})
        .then(response => {
            FileDownload(response.data, `payslip${payslipId}.pdf`)
        })
    }
    
    if (props.payslip.id === null) return <a className="text">No payslips to display!</a>

    return (
        <div className="payslip">
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
                <div className="periodContainer">
                    <a className="text">Date Of Preparation: {props.payslip.dateOfPreparation}</a>
                </div>
            </div>
            <div className="downloadPDFButtonContainer">
                <input type="button" value="Download PDF" id="payslip_${payslip.id}" className="button buttonAnimation OnFocus downloadPDFButton" onClick={() => handleDownload(props.payslip.id)}/>
            </div>
        </div>
    );
}