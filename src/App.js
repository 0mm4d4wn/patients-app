import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './views/Home';
import PatientList from './views/PatientList';
import PatientView from './views/PatientView';
import PatientForm from './views/PatientForm';
import UserSession from './components/UserSession';
import { UserProvider } from './components/UserContext';


function App() {
  return (
    <UserProvider>
    <Router>
      <div className="App">
        <div className="App-container">
          <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <div className="text-xl font-bold">Patients Control</div>
            <UserSession />
          </header>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/patient-list" element={<PatientList />} />
              <Route path="/patient-form/:id?" element={<PatientForm />} />
              <Route path="/patient-view/:id" element={<PatientView />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
