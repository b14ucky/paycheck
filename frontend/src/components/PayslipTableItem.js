import React from 'react';
import axios from 'axios';

const client = axios.create();

import FileDownload from 'js-file-download';

export default function PayslipTableItem(props) {

    function handleDownload(payslipId) {
        client.post('/api/download-payslip/', {'id': payslipId}, {responseType: 'blob'})
        .then(response => {
            FileDownload(response.data, `payslip${payslipId}.pdf`)
        })
    }

    if (props.payslip.id === null) return (
        <tr className="payslip">
            <td className="payslipData">
                <a className="text">No payslips to display!</a>
            </td>
        </tr>
    );

    return (
        <tr className="payslip">
            <td className="payslipData">
                <a className="text">Added:</a>
                <a className="data">{props.payslip.dateOfPreparation}</a>
            </td>
            <td className="payslipData">
                <a className="text">Net Pay: </a>
                <a className="data">{props.payslip.netPay} PLN</a>
            </td>
            <td className="downloadButton" onClick={() => handleDownload(props.payslip.id)}>
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4BBEA7"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </td>
        </tr>
    );
}