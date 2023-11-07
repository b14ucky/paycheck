import { createRoot } from 'react-dom/client';
import React from 'react';
import MainPage from './MainPage';


const appContainer = document.getElementById('app');
const root = createRoot(appContainer);

export default function App() {
    return <MainPage />;
}
root.render(<App />);