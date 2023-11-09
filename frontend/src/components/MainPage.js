import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import CalculatorPage from './CalculatorPage';
import PayslipsPage from './PayslipsPage';
import RedirectPage from './RedirectPage';


export default function MainPage() {
    return (
        <Router>
                <Routes>
                    <Route exact path='' element={<RedirectPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/dashboard' element={<DashboardPage />} />
                    <Route path='/calculator' element={<CalculatorPage />} />
                    <Route path='/payslips' element={<PayslipsPage />} />
                </Routes>
        </Router>
    );
}