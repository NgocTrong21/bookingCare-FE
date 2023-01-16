import React, { Component } from "react";
import { connect } from "react-redux";
import { userServices } from "../../services";
import HomeHeader from "../HomePage/HomeHeader";
import "./confirmAppointment.scss";

class ConfirmAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false,
      errorCode: "",
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.location) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await userServices.postVerifyAppointment({
        token,
        doctorId,
      });
      if (res && res.errorCode === 0) {
        this.setState({
          verified: true,
          errorCode: res.errorCode,
        });
      } else {
        this.setState({
          verified: true,
          errorCode: res.errorCode,
        });
      }
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  render() {
    return (
      <>
        <HomeHeader />
        <div className="text-verify">
          {this.state.verified === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {this.state.errorCode === 0 ? (
                <div className="verify-succeed">
                  Đã xác nhận lịch khám thành công
                </div>
              ) : (
                <div className="verify-failed">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAppointment);
