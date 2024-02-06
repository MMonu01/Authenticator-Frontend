import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { GetUserLogin, RequestOtp, SendEmailLink } from "../../actions/login-actions";

const Login = (props) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [login_with, setLoginWith] = useState("otp");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    props
      .Get_User_Login(otp, password)
      .then((res) => {
        console.log("success");
        navigate("/");
      })
      .catch(() => {});
  };

  const sendEmail = () => {
    props.Send_Email_Link();
    alert("sent email");
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "purple", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", background: "purple", width: "250px" }}>
        <div style={{ fontSize: "22px", color: "white" }}>Parallax</div>

        {login_with === "otp" ? (
          <>
            <input
              type="text"
              placeholder="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                password !== "" && setPassword("");
              }}
              style={{ padding: "4px", outline: "none" }}
            />
            <span onClick={props.Request_Otp} style={{ color: "white", fontSize: "10px" }}>
              Request otp
            </span>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                otp !== "" && setOtp("");
              }}
              style={{ padding: "4px", outline: "none" }}
            />
          </>
        )}
        <button onClick={handleLogin} style={{ background: "red", color: "white", outline: "none" }}>
          Login
        </button>

        {login_with === "otp" ? (
          <div onClick={() => setLoginWith("password")} style={{ fontSize: "10px", color: "white", cursor: "pointer" }}>
            Login with password
          </div>
        ) : (
          <div onClick={() => setLoginWith("otp")} style={{ fontSize: "10px", color: "white", cursor: "pointer" }}>
            Login with otp{" "}
          </div>
        )}

        <button onClick={sendEmail}>Send Email link</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Get_User_Login: (otp, password) => dispatch(GetUserLogin(otp, password)),
  Request_Otp: () => dispatch(RequestOtp()),
  Send_Email_Link: () => dispatch(SendEmailLink()),
});

export default connect(null, mapDispatchToProps)(Login);
