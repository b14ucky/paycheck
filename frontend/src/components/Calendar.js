import React, { useState } from 'react';

export default function Calendar() {
    const [date, setDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function generateCalendar() {
        const currentMonth = date.getMonth();
        const daysInMonth = new Date(date.getFullYear(), currentMonth + 1, 0).getDate();
        const startDay = new Date(date.getFullYear(), currentMonth, 1).getDay();

        let dayCounter = 1;
        const calendarRows = [];

        for (let i = 0; i < 6; i++) {
            const days = [];
            for (let j = 0; j < 7; j++) {
                const isCurrentDay = currentDate.getDate() === dayCounter && currentDate.getMonth() === currentMonth && currentDate.getFullYear() === date.getFullYear();

                if ((i === 0 && j < startDay) || dayCounter > daysInMonth) {
                    days.push(<td key={j}></td>);
                  } else {
                    days.push(
                    <td key={j} className={isCurrentDay ? 'currentDay' : ''}>
                        {dayCounter <= daysInMonth ? dayCounter++ : ''}
                    </td>
                    );
                }
            }
            calendarRows.push(<tr key={i}>{days}</tr>);
        }

        return calendarRows;
    };
    
    return (
        <div className="secondRowItem">
            <a className="title">Calendar</a>
            <div className="calendarControls">
                <button className="calendarButton" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))}>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4BBEA7"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 12H5" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 19L5 12L12 5" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
                <a className="month">{capitalizeFirstLetter(date.toLocaleString('default', { month: 'long' }))} {date.getFullYear()}</a>
                <button className="calendarButton" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))}>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4BBEA7"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H19" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 5L19 12L12 19" stroke="#4BBEA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
            </div>
            <div className="container">
                <table className="calendar">
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>{generateCalendar()}</tbody>
                </table>
            </div>
        </div>
    );
}