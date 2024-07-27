import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Form from './components/Form';
import DataTable from './components/DataTable';
const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/form" element={<Form />} />
                    {localStorage.getItem("token") ?
                        <Route exact path="/" element={<DataTable />} />
                        :
                        <Route exact path="/" element={<Login />} />
                    }
                </Routes>
            </div>
        </Router>
    );
};

export default App;
