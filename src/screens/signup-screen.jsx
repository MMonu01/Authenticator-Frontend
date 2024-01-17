import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GetUserSignup } from "../actions/login-actions";
import { Alertify } from "../scripts/Alertify";
import { connect } from "react-redux";

const SignupScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Alertify.error("Please fill all the credentials");
    } else {
      props
        .Get_User_Signup(name, email, password)
        .then((res) => {
          navigate("/login");
        })
        .catch(() => {});
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "purple", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", background: "purple", width: "250px" }}>
        <div style={{ fontSize: "22px", color: "white" }}>Parallax</div>
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "4px", outline: "none" }} />
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "4px", outline: "none" }} />
        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "4px", outline: "none" }} />
        <button onClick={handleSignup} style={{ background: "red", color: "white", outline: "none" }}>
          signup
        </button>
        <div style={{ fontSize: "10px" }}>
          Already have an account{" "}
          <Link to="/login" style={{ color: "white", textDecoration: "underline" }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Get_User_Signup: (name, email, password) => dispatch(GetUserSignup(name, email, password)),
});

export default connect(null, mapDispatchToProps)(SignupScreen);
