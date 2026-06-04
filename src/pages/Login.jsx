import React, { useState } from "react";
import styles from "./Login.module.css";

function Login({ navigate, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5001/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        navigate("dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>

        {/* Left Side */}
        <div className={styles.leftPanel}>
          <div className={styles.brandContent}>
            <h1 className={styles.mainTitle}>
              RESUME <br />
              <span className={styles.highlightText}>
                ANALYZER
              </span>
            </h1>

            <p className={styles.tagline}>
              Analyze. Improve. Succeed.
            </p>

            <p className={styles.description}>
              Get AI-powered insights to improve your resume
              and land your dream job.
            </p>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.heroImage}>
  Resume Analyzer
</div>
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.rightPanel}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Login</h2>

            <p className={styles.formSubtitle}>
              Please sign in to your account
            </p>

            <form
              onSubmit={handleSubmit}
              className={styles.loginForm}
            >
              <div className={styles.inputGroup}>
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.loginButton}
              >
                Login
              </button>
            </form>

            <p className={styles.signupText}>
              Don't have an account?{" "}
              <span
                className={styles.signupLink}
                onClick={() => navigate("signup")}
                style={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;