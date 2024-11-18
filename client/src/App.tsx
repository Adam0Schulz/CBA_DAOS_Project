import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './App.css'
import { User } from "@packages/types"

function App() {

  const handleFetch = async () => {

    const response = await fetch("/api/users");
    const users: User[] = await response.json();
    console.log(users[0]);

  }

  handleFetch();

  

  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    </Router>
);
};

export default App
