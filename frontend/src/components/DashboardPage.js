import React from "react";
import Navbar from "./Navbar";
import Calendar from "./Calendar";
import Header from "./Header";

export default function DashboardPage() {

    function displayCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    return (
        <main className="dashboard">
            <Navbar />
            <section className="mainWrapper">
                <Header />
                <div className="main">
                    <div className="firstRow">
                        <div className="firstRowItem">
                            <a className="text">Last Pay:</a>
                            <br />
                            <a className="number">4500 PLN</a>
                        </div>
                        <div className="firstRowItem">
                            <a className="text">Next Pay in:</a>
                            <br />
                            <a className="number">5 days</a>
                        </div>
                        <div className="firstRowItem">
                            <a className="text">Messages:</a>
                            <br />
                            <a className="number">3 unread</a>
                        </div>
                        <div className="firstRowItem">
                            <a className="text">Today is: </a>
                            <br />
                            <a className="number date">{displayCurrentDate()}</a>
                        </div>
                    </div>
                    <div className="secondRow">
                        <div className="secondRowItem">
                            <a className="title">Latest Payslips</a>
                            <div className="container">
                                <table className="payslips">
                                    <tbody>
                                        <tr className="payslip">
                                            <td className="payslipData">
                                                <a className="text">Month: </a>
                                                <a className="data">October</a>
                                            </td>
                                            <td className="payslipData">
                                                <a className="text">Net Pay: </a>
                                                <a className="data">100 000 PLN</a>
                                            </td>
                                            <td className="downloadButton">
                                                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4BBEA7"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                            </td>
                                        </tr>
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