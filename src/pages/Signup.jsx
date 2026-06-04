import React, { useState } from 'react';
import './Signup.css';

function Signup({ navigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5001/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Account Created Successfully");
      navigate("login");
    } else {
      alert("Signup Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};
  return (
    <div className="signup-container">
      <div className="signup-card">
        
        {/* Left Side: Info/Branding */}
        <div className="signup-left">
          <div className="brand-content">
            <h1>Analyze Smarter.</h1>
            <h1 className="highlight-text">Hire Better.</h1>
            <p>
              Our AI-powered resume analyzer helps you screen, evaluate, and
              shortlist the best candidates in seconds.
            </p>
          </div>
          
          {/* Mock Illustration Area */}
          <div className="illustration-container">
            <div className="mock-laptop">
              <div className="mock-profile-card">
                <div className="avatar"></div>
                <div className="stars">★★★★★</div>
                <div className="skills-badge">
                  <span>Python</span>
                  <span>Machine Learning</span>
                  <span>SQL</span>
                </div>
              </div>
              <div className="mock-score-badge">
                <span className="score-num">92</span>
                <span className="score-label">Match Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="signup-right">
          <div className="form-container">
            <h2>CREATE ACCOUNT</h2>
            <p className="subtitle">Start your journey to dream job today</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your Mail id"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="signup-btn">
                SIGN UP
              </button>
            </form>

           <p className="login-redirect">
  Already have an account?{" "}
  <span
    style={{ color: "#2563eb", cursor: "pointer" }}
    onClick={() => navigate("login")}
  >
    Log In
  </span>
</p>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;