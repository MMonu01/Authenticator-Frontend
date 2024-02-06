import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GetUserSignup, RequestOtp, GetUserLogin } from "../../actions/login-actions";
import { Alertify } from "../../scripts/Alertify";
import { connect } from "react-redux";

const Signup = (props) => {
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show_otp, setShowOtp] = useState(false);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !password) {
      Alertify.error("Please fill all the credentials");
    } else if (!otp) {
      setShowOtp(true);
    } else {
      props
        .Get_User_Signup(name, password, otp)
        .then((res) => {
          props.Get_User_Login(otp, password).then(() => {
            navigate("/");
          });
        })
        .catch(() => {});
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "purple", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", background: "purple", width: "250px" }}>
        {!show_otp ? (
          <>
            <div style={{ fontSize: "22px", color: "white" }}>Parallax</div>
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "4px", outline: "none" }} />
            <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "4px", outline: "none" }} />
            <button onClick={handleSignup} style={{ background: "red", color: "white", outline: "none" }}>
              continue
            </button>
            <div style={{ fontSize: "10px" }}>
              Already have an account{" "}
              <Link to="/login" style={{ color: "white", textDecoration: "underline" }}>
                Login
              </Link>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              style={{ padding: "4px", outline: "none" }}
            />
            <span onClick={props.Request_Otp} style={{ color: "white", fontSize: "10px" }}>
              Request otp
            </span>
            <button onClick={handleSignup} style={{ background: "red", color: "white", outline: "none" }}>
              Signup
            </button>
          </>
        )}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Request_Otp: () => dispatch(RequestOtp()),
  Get_User_Login: (otp, password) => dispatch(GetUserLogin(otp, password)),
  Get_User_Signup: (name, password, otp) => dispatch(GetUserSignup(name, password, otp)),
});

export default connect(null, mapDispatchToProps)(Signup);
