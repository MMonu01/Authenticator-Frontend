import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { LoginVerifyUser } from "../../actions/login-actions";
import { Alertify } from "../../scripts/Alertify";

const VerifyUser = (props) => {
  const [email, setEmail] = useState("");

  const handleVerifyUser = (e) => {
    e.preventDefault();

    const email_validator = /^[A-Za-z0-9]+@[A-Za-z]+.com/;
    if (!email_validator.test(email)) {
      Alertify.error("Invalid email");
    } else {
      props.Login_Verify_User(email).then((res) => {});
    }
  };

  const showDisabled = !email || email.length < 6;

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#19bfa1", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", background: "red", width: "250px" }}>
        <div style={{ fontSize: "22px", color: "white" }}>Parallax</div>

        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "7px", outline: "none" }} />

        <button onClick={handleVerifyUser} disabled={showDisabled} style={{ background: showDisabled ? "#e3d5b3" : "orange", cursor: showDisabled ? "no-drop" : "pointer", color: "white", outline: "none" }}>
          submit
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Login_Verify_User: (email) => dispatch(LoginVerifyUser(email)),
});

export default connect(null, mapDispatchToProps)(VerifyUser);
