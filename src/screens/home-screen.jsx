import { useEffect } from "react";
import { connect } from "react-redux";

import { getHomeData } from "../actions/home-actions";
import { GetUserDetails } from "../actions/login-actions";

const HomeScreen = (props) => {
  useEffect(() => {
    props.Get_User_Details();
    getHomeData().then(() => {});
  }, []);

  return <div style={{ height: "100vh", width: "100vw", background: "turquoise", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", color: "white" }}>Home page</div>;
};

const mapStateToProps = (state) => ({
  logged_in_success: state.login_store.logged_in_success,
});
const mapDispatchToProps = (dispatch) => ({
  Get_User_Details: (email, password) => dispatch(GetUserDetails(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
