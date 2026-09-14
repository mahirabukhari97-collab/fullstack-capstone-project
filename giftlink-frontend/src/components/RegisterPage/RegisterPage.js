import React, { useState } from 'react'; import './RegisterPage.css'; function RegisterPage() { const [firstName, setFirstName] = useState(''); const [lastName, setLastName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const handleRegister = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.authtoken);
                localStorage.setItem('email', data.email);
                window.location.href = '/app';
            } else {
                console.error('Registration failed:', data.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }; return ( <div className="container mt-5"> <div className="row justify-content-center"> <div className="col-md-6 col-lg-4"> <div className="register-card p-4 border rounded"> <h2 className="text-center mb-4 font-weight-bold">Register</h2> <div className="mb-3"> <label className="form-label">First Name</label> <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> </div> <div className="mb-3"> <label className="form-label">Last Name</label> <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} /> </div> <div className="mb-3"> <label className="form-label">Email</label> <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} /> </div> <div className="mb-3"> <label className="form-label">Password</label> <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} /> </div> <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button> <p className="mt-4 text-center"> Already a member? <a href="/app/login" className="text-primary">Login</a> </p> </div> </div> </div> </div> ); } export default RegisterPage;