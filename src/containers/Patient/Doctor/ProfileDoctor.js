import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import localization from "moment/locale/vi";
import moment from "moment";
import "./profileDoctor.scss";
import { userServices } from "../../../services";
import _ from "lodash";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: {},
    };
  }

  async componentDidMount() {
    let res = await userServices.getDetailDoctor(this.props.doctorId);
    if (res && res.errorCode === 0) {
      this.setState({
        dataDoctor: res.doctors,
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.doctorId !== this.props.doctorId) {
      let res = await userServices.getDetailDoctor(this.props.doctorId);
      this.setState({
        dataDoctor: res.doctors,
      });
    }
  };

  formatName = () => {
    let name = "";
    if (
      this.state.dataDoctor.firstName &&
      this.state.dataDoctor.lastName &&
      this.state.dataDoctor.positionData &&
      this.state.dataDoctor.positionData.valueVi
    ) {
      name = `${this.state.dataDoctor.positionData.valueVi} ${this.state.dataDoctor.firstName} ${this.state.dataDoctor.lastName}`;
    }
    return name;
  };

  renderTimeSchedule = () => {
    let time = "";
    let date = "";
    let formatDate = "";
    if (this.props.selectedTime && !_.isEmpty(this.props.selectedTime)) {
      time = this.props.selectedTime;
      date = moment.unix(+time.date / 1000).format("dddd - DD/MM/YYYY");
      formatDate = date.charAt(0).toUpperCase() + date.slice(1);
    }
    return (
      <>
        {time.timeTypeData && time.timeTypeData.valueVi ? (
          <div>{`${time.timeTypeData.valueVi} ${"  "} ${formatDate}`}</div>
        ) : (
          ""
        )}
      </>
    );
  };

  render() {
    let { Doctor_Infor } = this.state.dataDoctor;
    let price = "";
    if (
      Doctor_Infor &&
      !_.isEmpty(Doctor_Infor) &&
      Doctor_Infor.priceTypeData
    ) {
      price = Doctor_Infor.priceTypeData.valueVi;
    }
    this.renderTimeSchedule();
    return (
      <>
        <div className="infor-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                this.state.dataDoctor && this.state.dataDoctor.image
                  ? this.state.dataDoctor.image
                  : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="name">{this.formatName()}</div>
            <div className="schedule">{this.renderTimeSchedule()}</div>
            <div className="price">
              {price ? (
                <>
                  <span>Giá khám: </span>
                  <NumberFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
