import React, { Component } from "react";
import { connect } from "react-redux";
import "./doctorSchedule.scss";
import { userServices } from "../../../services";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      availableTimes: [],
      currentDoctorId: "",
      isOpenBooking: false,
      selectedTime: "",
    };
  }

  async componentDidMount() {
    let currentDate = moment(new Date()).startOf("days").valueOf();
    if (this.props.doctorId && this.props.doctorId !== -1) {
      this.handleGetScheduleByDate(this.props.doctorId, currentDate);
    }
    let arrDay = [];
    for (let i = 0; i <= 6; i++) {
      let object = {};
      if (i === 0) {
        let today = `hôm nay ${moment(new Date()).format("DD/MM")}`;
        object.label = today.charAt(0).toUpperCase() + today.slice(1);
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("days")
          .valueOf();
        arrDay.push(object);
      } else {
        let string = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = string.charAt(0).toUpperCase() + string.slice(1);
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("days")
          .valueOf();
        arrDay.push(object);
      }
    }

    this.setState({
      allDays: arrDay,
      currentDoctorId: this.props.doctorId,
    });
  }

  handleChange = (data) => {
    this.handleGetScheduleByDate();
    if (this.props.doctorId && this.props.doctorId !== -1) {
      this.handleGetScheduleByDate(this.props.doctorId, data);
    }
  };

  handleOpenModal = (time) => {
    this.setState({
      isOpenBooking: true,
      selectedTime: time,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenBooking: false,
    });
  };

  handleGetScheduleByDate = async (doctorId, data) => {
    let dataSchedule = await userServices.getScheduleByDate(doctorId, data);
    if (dataSchedule && dataSchedule.errorCode === 0) {
      this.setState({
        availableTimes: dataSchedule.data,
      });
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.doctorId !== this.props.doctorId) {
      this.setState({
        currentDoctorId: this.props.doctorId,
      });

      if (this.props.doctorId) {
        this.handleGetScheduleByDate(
          this.props.doctorId,
          this.state.allDays[0].value
        );
      }
    }
  };

  render() {
    let { allDays, availableTimes } = this.state;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select
            className="select-schedule"
            onChange={(e) => this.handleChange(e.target.value)}
          >
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
          </select>
        </div>
        <div className="doctor-schedule-content">
          <span className="title-schedule">Lịch khám</span>
          <div className="schedule-button">
            {availableTimes && availableTimes.length > 0
              ? availableTimes.map((item, index) => (
                  <button
                    className="btn-time"
                    key={index}
                    onClick={() => this.handleOpenModal(item)}
                  >
                    {item.timeTypeData.valueVi}
                  </button>
                ))
              : "Không có lịch khám trong ngày, vui lòng chọn ngày khác!"}
          </div>
          <div className="choose-schedule">{`Chọn và đặt lịch khám (Phí đặt lịch 0đ)`}</div>
        </div>
        <BookingModal
          doctorId={this.state.currentDoctorId}
          isOpenBooking={this.state.isOpenBooking}
          handleCloseModal={this.handleCloseModal}
          selectedTime={this.state.selectedTime}
          handleSetLoading={this.props.handleSetLoading}
        />
        <div className="available-time"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
