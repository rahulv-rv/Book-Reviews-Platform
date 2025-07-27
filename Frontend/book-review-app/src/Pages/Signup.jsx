import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import "../Styles/Login.css"

const Signup = () => {

    const [form,setForm] = useState({
        name:"",
        email:"",
        mobile:"",
        gender:"",
        password:"",
        confirmPassword:""
    })

    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const {name,email,mobile,gender,password,confirmPassword} = form;

        //validation
        if(!name || !email || !mobile || !gender || !password || !confirmPassword){
            setError("All Fields are Required")
            return ;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError('Mobile number must be 10 digits and start with 6, 7, 8, or 9.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('http://localhost:1919/api/auth/signup',{name, email, mobile, gender, password});
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Try again.');
        }
    }
  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  )
}

export default Signup