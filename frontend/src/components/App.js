import { createRoot } from 'react-dom/client';
import React from 'react';
import MainPage from './MainPage';
import './App.scss';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const appContainer = document.getElementById('app');
const root = createRoot(appContainer);

export default function App() {
    return <MainPage />;
}
root.render(<App />);