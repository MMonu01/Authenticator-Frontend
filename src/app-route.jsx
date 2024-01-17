import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import HomeScreen from "./screens/home-screen";
import LoginScreen from "./screens/login-screen";
import SignupScreen from "./screens/signup-screen";

const AppRoute = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((location.pathname === "/signup" || location.pathname === "/login") && props.logged_in_success) {
      navigate("/");
    } else if (location.pathname === "/signup") {
      // do nothing
    } else {
      navigate("/login");
    }
  }, [props.logged_in_success]);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  logged_in_success: state.login_store.logged_in_success,
});
export default connect(mapStateToProps)(AppRoute);
