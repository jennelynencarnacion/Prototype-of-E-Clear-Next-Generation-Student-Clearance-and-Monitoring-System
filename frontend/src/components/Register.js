import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); 
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    program: '',
    year: '',
    status: '',
    mobileNumber: '',
    email: '',
    department: '',
    role: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        userType,
        ...(userType === 'student' ? {
          fullname: formData.fullname,
          username: formData.username,
          password: formData.password,
          studentId: formData.studentId,
          program: formData.program,
          year: formData.year,
          status: formData.status,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
        } : {
          fullname: formData.fullname,
          username: formData.username,
          password: formData.password,
          department: formData.department,
          role: formData.role,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
        }),
      });
      alert(response.data.message);
      
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="student">Student</option>
          <option value="signatory">Signatory</option>
        </select>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {userType === 'student' && (
          <>
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
            <select name="program" value={formData.program} onChange={handleChange} required>
              <option value="">Select Program</option>
              <option value="College of Allied Health Sciences">College of Allied Health Sciences</option>
              <option value="College of Arts and Social Sciences">College of Arts and Social Sciences</option>
              <option value="College of Business and Accountancy">College of Business and Accountancy</option>
              <option value="College of Education">College of Education</option>
              <option value="College of Engineering">College of Engineering</option>
              <option value="College of Environmental Sciences">College of Environmental Sciences</option>
              <option value="College of Governance">College of Governance</option>
              <option value="College of Industrial Technology">College of Industrial Technology</option>
              <option value="College of Information and Computing Sciences">College of Information and Computing Sciences</option>
            </select>
            
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              required
            />
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="regular">Regular</option>
              <option value="irregular">Irregular</option>
            </select>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}
        {userType === 'signatory' && (
          <>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="treasurer">Student Organization Treasurer</option>
              <option value="president">Student Organization President</option>
              <option value="dean">Dean</option>
              <option value="cashier">Cashier</option>
              <option value="registrar">Registrar</option>
              <option value="vpsas">VPSAS</option>
            </select>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
