import React, { useState } from "react";
import { useSignupMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup({ username, fullname, email, password });
    if (response.error) {
      setErrorMessage("Please fill in all the fields");
    } else {
      console.log("Signup successful!");
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
      navigate("/login");
    }
  };

  const containerStyle = {
    backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/moraine-lake-banff-national-park-mountains-daytime-scenery-3840x2160-2923.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const glassmorphismStyle = {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div
            className="col-lg-6 col-md-8 login-box"
            style={glassmorphismStyle}
          >
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
                    {errorMessage && (
                      <div className="error-message">{errorMessage}</div>
                    )}
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
    </div>
  );
};

export default SignupForm;
