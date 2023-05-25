import React, { useState } from "react";
import { useSignupMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const[signup] = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform signup logic here
    const response = await signup({username, fullname, email, password}) 
      if (response.error){
        // Handle validation or input error
      setErrorMessage("Please fill in all the fields");
    } else {
      // Handle successful signup
      console.log("Signup successful!");
      // Reset form inputs
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">Signup Panel</div>
          <div className="col-lg-12 login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-control-label">USERNAME</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">FULLNAME</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">EMAIL</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">PASSWORD</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-lg-12 loginbttm">
                <div className="col-lg-6 login-btm login-text">
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="col-lg-6 login-btm login-button">
                  <button type="submit" className="btn btn-outline-primary">
                    SIGN UP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </div>
  );
};

export default SignupForm;