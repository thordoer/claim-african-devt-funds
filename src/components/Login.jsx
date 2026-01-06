import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [pin, setPin] = useState("");

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
  };

  const handleRegister = () => {
    console.log("Register clicked");
    // Add your logic here
  };

  const handleSupport = () => {
    console.log("Help & Support clicked");
    // Add your logic here
  };

  return (
    <div className="container">
      <header>
        <div className="logo">EcoCash</div>
        <h1 className="login-title">Login</h1>
      </header>

      <main>
        <div className="phone-number">+263 0773556520</div>

        <div className="pin-input-container">
          <label className="pin-label">Enter your PIN</label>
          <input
            type="password"
            className="pin-input"
            value={pin}
            onChange={handlePinChange}
            maxLength="4"
            pattern="\d*"
            inputMode="numeric"
          />
        </div>

        <div className="forgot-pin">
          <a href="#">Forgot PIN?</a>
        </div>
      </main>

      <footer className="footer">
        <div className="help-section">
          <p className="help-text">
            To register an EcoCash wallet or get assistance, click below
          </p>

          <div className="buttons-container">
            <button
              className="help-button register-button"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="help-button support-button"
              onClick={handleSupport}
            >
              Help & Support
            </button>
          </div>
        </div>

        <div className="terms">
          <div className="version">v2.1.3P</div>
          By signing in you agree to the Terms and Conditions
        </div>
      </footer>
    </div>
  );
}

export default Login;
