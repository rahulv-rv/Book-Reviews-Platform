import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import "../Styles/Login.css"

const Login = () => {

    const [form,setForm] = useState({email:"",password:""});
    const [error,setError] = useState("");
    const navigate = useNavigate();
    document.title = "Book Reviews | Login"
    const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.email || !form.password) {
        setError("Both fields are required.");
        return;
        }

        try {
            const res = await axios.post('http://localhost:1919/api/auth/login',form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('name', res.data.name);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError("Invalid credentials. Please try again.");
        }
    };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-box">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login