import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { GetUserLogin } from "../actions/login-actions";
import { Alertify } from "../scripts/Alertify";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Alertify.error("Please fill the credentails");
    } else {
      props.Get_User_Login(email, password).then((res) => {
        console.log("success");
        navigate("/");
      });
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "purple", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", background: "purple", width: "250px" }}>
        <div style={{ fontSize: "22px", color: "white" }}>Parallax</div>

        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "4px", outline: "none" }} />
        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "4px", outline: "none" }} />
        <button onClick={handleLogin} style={{ background: "red", color: "white", outline: "none" }}>
          Login
        </button>
        <div style={{ fontSize: "10px" }}>
          Already have an account{" "}
          <Link to="/signup" style={{ color: "white", textDecoration: "underline" }}>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Get_User_Login: (email, password) => dispatch(GetUserLogin(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
