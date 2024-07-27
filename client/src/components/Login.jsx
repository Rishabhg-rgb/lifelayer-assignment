import React, { useState } from 'react';
import axios from 'axios';
import Endpoint from '../../config.json';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const user = { email, password };
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const body = JSON.stringify(user);
            const res = await axios.post(`${Endpoint.API_URL}/auth/login`, body, config);
            if (res.status == 200) {
                console.log(res)
                localStorage.setItem('token', res.data.data);
                window.location.replace("/table")
            }
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
