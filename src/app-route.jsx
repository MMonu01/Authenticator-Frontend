import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import EmailAuthentication from "./components/login/email-authentication";
import HomeScreen from "./screens/home-screen";
import LoginScreen from "./screens/login-screen";

const AppRoute = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.startsWith("/authentication/callback")) {
      if (location.pathname === "/login" && props.logged_in_success) {
        navigate("/");
      } else if (!(location.pathname === "/login") && !props.logged_in_success) {
        console.log("nothing");
        navigate("/login");
      }
    }
  }, [props.logged_in_success]);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      {/* <Route path="/signup" element={<SignupScreen />} /> */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/authentication/callback/:token" element={<EmailAuthentication />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  logged_in_success: state.login_store.logged_in_success,
});
export default connect(mapStateToProps)(AppRoute);
