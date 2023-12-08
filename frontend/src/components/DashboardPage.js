import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Calendar from "./Calendar";
import Header from "./Header";
import axios from "axios";
import PayslipTableItem from "./PayslipTableItem";

const client = axios.create();

export default function DashboardPage() {

    const [user, setUser] = useState({});
    const [payslips, setPayslips] = useState([]);

    function displayCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    function nextPayDate() {
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        const nextPayDate = new Date(currentYear, currentDay >= 10 ? currentMonth + 1 : currentMonth, 10);
        const daysLeft = Math.ceil((nextPayDate.getTime() - date.getTime()) / (1000 * 3600 * 24));
        return daysLeft;
    }

    useEffect(() => {
        client.get('/auth/user')
        .then(response => {
            setUser(response.data.user);
            displayPayslips(response.data.user.id);
        })
        .catch(error => navigate('/login/'));
    }, [])

    function displayPayslips(employeeId) {
        client.get(`/api/get-payslip/?employeeId=${employeeId}`)
            .then(response => {
                if (response.data === '') setPayslips([{id: null}]);
                else if (response.data.length > 4) setPayslips(response.data.slice(response.data.length - 4, response.data.length).reverse());
                else setPayslips(response.data);
            })
            .catch(error => console.log(error));
    }

    let fontSize = '2.15rem';

    if (payslips.length && payslips[0].netPay > 10000) fontSize = '2rem';
    if (payslips.length && payslips[0].netPay > 100000) fontSize = '1.85rem';

    return (
        <main className="dashboard">
            <Navbar />
            <section className="mainWrapper">
                <Header title="Dashboard" />
                <div className="main">
                    <div className="firstRow">
                        <div className="firstRowItem">
                            <a className="text">Last Pay:</a>
                            <br />
                            <a className="number" style={{fontSize}}>{payslips.length ? payslips[0].netPay ? `${payslips[0].netPay} PLN`: '0 PLN' : '0 PLN'}</a>
                        </div>
                        <div className="firstRowItem">
                            <a className="text">Next Pay in:</a>
                            <br />
                            <a className="number">{nextPayDate()} days</a>
                        </div>
                        <div className="firstRowItem">
                            <a className="text">Today is: </a>
                            <br />
                            <a className="number date">{displayCurrentDate()}</a>
                        </div>
                        <div className="firstRowItem">
                            <a className="text">Logged in as:</a>
                            <br />
                            <a className="number">{user.username}</a>
                        </div>
                    </div>
                    <div className="secondRow">
                        <div className="secondRowItem">
                            <a className="title">Latest Payslips</a>
                            <div className="container">
                                <table className="payslips">
                                    <tbody>
                                        {payslips.map(payslip => (<PayslipTableItem key={payslip.id} payslip={payslip} />))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Calendar />
                    </div>
                </div>
            </section>
        </main>
    );
}