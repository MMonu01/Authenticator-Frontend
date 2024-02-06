import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { VerifyEmail } from "../../actions/login-actions";

const EmailAuthentication = (props) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email_verify, setEmailVerify] = useState("");

  useEffect(() => {
    let timer;
    props
      .Verify_Email(token)
      .then(() => {
        setEmailVerify("success");
        timer = setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch(() => {
        setEmailVerify("error");
      });

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return <>{email_verify === "" ? <div>Loading...</div> : email_verify === "success" ? <div>Authentication successfull</div> : <div>Authentication failed</div>}</>;
};

const mapDispatchToProps = (dispatch) => ({
  Verify_Email: (token) => dispatch(VerifyEmail(token)),
});

export default connect(null, mapDispatchToProps)(EmailAuthentication);
