import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../store/actions";
import { userServices } from "../../../../services";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      arrGenders: [],
      gender: "",
      phoneNumber: "",
      address: "",
      reason: "",
      doctorId: "",
      timeType: "",
      date: "",
      timeString: "",
      doctorName: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchGenderStart();
    if (this.props.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
      });
    }

    if (
      this.props.selectedTime &&
      this.props.selectedTime.timeTypeData &&
      this.props.selectedTime.date
    ) {
      this.setState({
        timeType: this.props.selectedTime.timeType,
        date: this.props.selectedTime.date,
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      if (this.props.genderRedux && this.props.genderRedux.length > 0) {
        let genderArr = this.props.genderRedux;
        this.setState({
          arrGenders: genderArr,
          gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
        });
      }
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
      });
    }
    if (prevProps.selectedTime !== this.props.selectedTime) {
      this.setState({
        timeType: this.props.selectedTime.timeType,
        date: this.props.selectedTime.date,
        timeString: this.buildTimeBooking(this.props.selectedTime),
        doctorName: `${this.props.selectedTime.doctorData.firstName} ${this.props.selectedTime.doctorData.lastName}`,
      });
    }
  };

  onChangeInput = (value, key) => {
    let copyState = { ...this.state };
    copyState[key] = value;
    this.setState({
      ...copyState,
    });
  };

  handelSaveBooking = async () => {
    this.props.handleSetLoading();
    let res = await userServices.postBookAppointment({
      email: this.state.email,
      doctorId: this.state.doctorId,
      date: this.state.date,
      timeString: this.state.timeString,
      timeType: this.state.timeType,
      gender: this.state.gender,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      reason: this.state.reason,
      fullName: this.state.fullName,
      doctorName: this.state.doctorName,
    });
    if (res && res.errorCode === 0) {
      this.props.handleSetLoading();
      toast.success("Create booking appoinment succeed!");
      this.props.handleCloseModal();
    } else {
      this.props.handleSetLoading();
      toast.error(res.message);
    }
  };

  buildTimeBooking = (selectedTime) => {
    let time = "";
    let date = "";
    let formatDate = "";
    if (selectedTime && !_.isEmpty(selectedTime)) {
      time = selectedTime;
      date = moment.unix(+time.date / 1000).format("dddd - DD/MM/YYYY");
      formatDate = date.charAt(0).toUpperCase() + date.slice(1);
      return `${time.timeTypeData.valueVi} ${formatDate}`;
    }
    return "";
  };

  render() {
    let { fullName, email, arrGenders, gender, phoneNumber, address, reason } =
      this.state;
    return (
      <Modal
        className="form-modal-container"
        isOpen={this.props.isOpenBooking}
        size="lg"
        centered
      >
        <div className="booking-content container">
          <div className="booking-header">
            <div className="icon">
              <div className="title">Thông tin đặt lịch khám bệnh</div>
              <i class="fas fa-times" onClick={this.props.handleCloseModal}></i>
            </div>
            <div className="infor-doctor">
              <ProfileDoctor
                doctorId={this.state.doctorId}
                selectedTime={this.props.selectedTime}
              />
            </div>
          </div>

          <div className="booking-body">
            <div className="row">
              <div className="form-group col-6">
                <label>Họ và tên</label>
                <input
                  className="form-control"
                  name="fullName"
                  value={fullName}
                  onChange={(e) =>
                    this.onChangeInput(e.target.value, "fullName")
                  }
                />
              </div>
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => this.onChangeInput(e.target.value, "email")}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputState">Giới tính</label>
                <select
                  name="gender"
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e.target.value, "gender");
                  }}
                  value={gender}
                >
                  {arrGenders &&
                    arrGenders.length > 0 &&
                    arrGenders.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {item.valueVi}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-6">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) =>
                    this.onChangeInput(e.target.value, "phoneNumber")
                  }
                />
              </div>
              <div className="form-group col-12">
                <label>Địa chỉ liên hệ</label>
                <input
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e) =>
                    this.onChangeInput(e.target.value, "address")
                  }
                />
              </div>
              <div className="form-group col-12">
                <label>Lý do khám</label>
                <input
                  className="form-control"
                  name="reason"
                  value={reason}
                  onChange={(e) => this.onChangeInput(e.target.value, "reason")}
                />
              </div>
            </div>
          </div>
          <div className="booking-footer">
            <div className="btn-booking">
              <button onClick={this.handelSaveBooking}>Đặt lịch khám</button>
              <button onClick={this.props.handleCloseModal}>Huỷ</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => {
      dispatch(actions.fetchGenderStart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
