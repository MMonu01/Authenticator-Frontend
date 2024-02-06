import { connect } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import Login from "../components/login/login";
import Signup from "../components/login/signup";
import VerifyUser from "../components/login/verify-user";

import { GoogleLogin } from "../actions/login-actions";

const LoginScreen = (props) => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      props.Google_Login(tokenResponse.access_token).then(() => {
        navigate("/");
      });
    },
  });

  return (
    <>
      {props.show_component === "" ? <VerifyUser /> : props.show_component === "new" ? <Signup /> : <Login />}

      <button onClick={googleLogin}>google Login</button>
    </>
  );
};

const mapStateToProps = (state) => ({
  show_component: state.login_store.show_component,
});

const mapDispatchToProps = (dispatch) => ({
  Google_Login: (token) => dispatch(GoogleLogin(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
