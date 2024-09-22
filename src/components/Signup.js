import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import alertcontext from './alertcontext';
import TaskContext from './taskcontext';


export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();
    const{showalert}=useContext(alertcontext);
    const { getuser } = useContext(TaskContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/createuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json); 
        
        if (json.success) {
          localStorage.setItem('token', json.authtoken);
          navigate("/");
          getuser();
          setTimeout(() => {
            showalert("Signed up successfully!");
          }, 3000);
        } else {
          alert(json.error);
          navigate("/signup");
        }
      };
      

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
