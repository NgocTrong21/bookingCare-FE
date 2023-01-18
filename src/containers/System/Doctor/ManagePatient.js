import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { userServices } from "../../../services";
import _ from "lodash";
import "./managePatient.scss";
import moment from "moment/moment";
import RemedyModal from "./RemedyModal";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("days").valueOf(),
      doctorId: "",
      patientArr: [],
      selectedPatient: {},
      isOpenRemedy: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.doctorState && !_.isEmpty(this.props.doctorState)) {
      if (this.props.doctorState.userInfo.user.id) {
        this.getListPatientData(
          this.props.doctorState.userInfo.user.id,
          this.state.currentDate
        );
        this.setState({
          doctorId: this.props.doctorState.userInfo.user.id,
        });
      }
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevState.currentDate !== this.state.currentDate) {
      this.getListPatientData(this.state.doctorId, this.state.currentDate);
    }
  };

  handleChangePicker = async (date) => {
    let inputDate = new Date(date[0]).getTime();
    this.setState({
      currentDate: inputDate,
    });
  };

  handleSetLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  getListPatientData = async (doctorId, currentDate) => {
    let patientArr = [];
    let res = await userServices.getListPatientForDoctor(doctorId, currentDate);
    if (res && res.errorCode === 0) {
      let bookingData = res.data;
      if (bookingData.length > 0) {
        patientArr = bookingData.map((item) => {
          return {
            ...item.patientInfor,
            bookingTime: item.bookingTime,
          };
        });
      }
    }
    this.setState({
      patientArr,
    });
  };

  handleSelectPatient = (item) => {
    this.handleToggle();
    this.setState({
      selectedPatient: item,
    });
  };

  handleToggle = () => {
    this.setState({
      isOpenRemedy: !this.state.isOpenRemedy,
    });
  };

  render() {
    let { patientArr } = this.state;
    console.log("check doctorState", this.state);
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
        <div className="manage-patient-container">
          <div className="mt-2 m-s title">
            <FormattedMessage id="manage-patient.title" />
          </div>
          <div className="container">
            <div className="col-6 form-group">
              <label>Chọn ngày</label>
              <DatePicker
                onChange={this.handleChangePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="users-table-redux mt-4 mx-5 my-5">
              <table id="customers">
                <tbody>
                  <tr>
                    <th>Stt</th>
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>Thao tác</th>
                  </tr>
                  {patientArr && patientArr.length > 0 ? (
                    patientArr.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.bookingTime.valueVi}</td>
                        <td>{item.lastName}</td>
                        <td>{item.genderData.valueVi}</td>
                        <td>
                          <button
                            onClick={() => this.handleSelectPatient(item)}
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="nodata">
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        Không có lịch khám nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <RemedyModal
            handleToggle={this.handleToggle}
            isOpenRemedy={this.state.isOpenRemedy}
            dataModal={{
              ...this.state.selectedPatient,
              doctorId: this.props.doctorState.userInfo.user.id,
              date: this.state.currentDate,
            }}
            getListPatientData={this.getListPatientData}
            handleSetLoading={this.handleSetLoading}
          />
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorState: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
