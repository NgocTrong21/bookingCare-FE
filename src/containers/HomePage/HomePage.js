import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import "../HomePage/HomePage.scss";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import CustomScrollbars from "../../components/CustomScrollbars";
import HomeFooter from "./HomeFooter";

class HomePage extends Component {
  render() {
    return (
      <>
        <CustomScrollbars style={{ height: "100vh", width: "100vw" }}>
          <HomeHeader isShowBanner={true} />
          <Specialty />
          <MedicalFacility />
          <OutStandingDoctor />
          <HomeFooter />
        </CustomScrollbars>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
