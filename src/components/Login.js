import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import TaskContext from './taskcontext';
import alertcontext from './alertcontext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { getTasks,getuser } = useContext(TaskContext);
    let navigate = useNavigate();
    const{showalert}=useContext(alertcontext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            getTasks();
            getuser();
            navigate("/");
            setTimeout(()=>{
                showalert("loged in successfully")
              },30);
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container' >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p>want to create account</p>
                <Link className="btn-primary"  to="/signup">Signup</Link>
            </form>
        </div>
    );
};

export default Login;
