import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import "./manageSchedule.scss";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { userServices } from "../../../services";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: "",
      currentDate: "",
      rangeTime: [],
      availableTimes: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchAllDoctorsStart();
    await this.props.fetchScheduleHourStart();
    if (this.props.userState.userInfo.user.roleId === "R2") {
      this.setState({
        selectedDoctor: {
          label: `${this.props.userState.userInfo.user.firstName} ${this.props.userState.userInfo.user.lastName}`,
          value: this.props.userState.userInfo.user.id,
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let listDoctors = this.buildDataDoctors(this.props.allDoctors);
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: listDoctors,
      });
    }
    if (prevProps.scheduleHours !== this.props.scheduleHours) {
      let data = this.props.scheduleHours;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.selected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: data,
      });
    }
    if (
      prevState.currentDate !== this.state.currentDate ||
      prevState.selectedDoctor.value !== this.state.selectedDoctor.value
    ) {
      let data = this.state.rangeTime;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.selected = false;
          return item;
        });
      }

      if (this.state.availableTimes && data) {
        let selectedTimes = data.map((item) => {
          for (let i = 0; i < this.state.availableTimes.length; i++) {
            if (item.keyMap === this.state.availableTimes[i].timeType) {
              item.selected = true;
            }
          }
          return {
            ...item,
          };
        });
        this.setState({
          rangeTime: selectedTimes,
        });
      }
    }
  }

  buildDataDoctors(inputData) {
    let listDoctors = [];
    if (inputData && inputData.length > 0) {
      listDoctors = inputData.map((item, index) => ({
        value: item.id,
        label: `${item.firstName} ${item.lastName}`,
      }));
    }
    return listDoctors;
  }

  handleChange = (doctor) => {
    this.setState(
      {
        selectedDoctor: doctor,
      },
      () => {
        console.log("check selected doctor", this.state.selectedDoctor);
      }
    );
  };

  handleChangePicker = async (date) => {
    this.setState({
      currentDate: date[0],
    });

    if (this.state.selectedDoctor.value) {
      let dataSchedule = await userServices.getScheduleByDate(
        this.state.selectedDoctor.value,
        new Date(date[0]).getTime()
      );
      if (
        dataSchedule &&
        dataSchedule.errorCode === 0 &&
        dataSchedule.data.length > 0
      ) {
        this.setState({
          availableTimes: dataSchedule.data,
        });
      } else {
        this.setState({
          availableTimes: "",
        });
      }
    }
  };

  handelSelectTime = (time) => {
    let data = this.state.rangeTime;
    if (time) {
      let newData = data.map((item) => {
        if (item.id === time.id) {
          item.selected = !item.selected;
          return item;
        } else {
          return item;
        }
      });
      this.setState({
        rangeTime: newData,
      });
    }
  };

  handleSaveTime = async () => {
    let { rangeTime, currentDate, selectedDoctor } = this.state;
    let formatDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.selected === true);
      let formatSelectedTime = selectedTime.map((item) => item.keyMap);
      if (!currentDate) {
        toast.error("Missing parameter date");
        return;
      } else if (selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.error("Missing parameter doctor");
        return;
      } else if (!selectedDoctor || selectedTime.length === 0) {
        toast.error("Missing parameter time");
        return;
      } else {
        let inputData = formatSelectedTime.map((item) => {
          return {
            date: formatDate,
            doctorId: selectedDoctor.value,
            timeType: item,
          };
        });

        try {
          let message = await userServices.createSchedule({
            arrData: inputData,
            doctorId: selectedDoctor.value,
            date: formatDate,
          });
          if (message.errorCode === 0) {
            toast.success("Create schedule succeed");
            let data = this.props.scheduleHours;
            if (data && data.length > 0) {
              data = data.map((item) => {
                item.selected = false;
                return item;
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  render() {
    let { rangeTime } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log("check userState:", this.props.userState);
    return (
      <div className="manage-schedule-container">
        <div className="mt-2 m-s title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            {this.props.userState &&
            this.props.userState.userInfo &&
            this.props.userState.userInfo.user &&
            this.props.userState.userInfo.user.roleId === "R1" ? (
              <div className="col-6 form-group">
                <label>Chọn bác sĩ</label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                />
              </div>
            ) : (
              <div className="col-6 form-group">
                <label>Bác sĩ</label>
                <input
                  className="form-control"
                  value={`${this.props.userState.userInfo.user.firstName} ${this.props.userState.userInfo.user.lastName}`}
                  disabled
                />
              </div>
            )}
            <div className="col-6 form-group">
              <label>Chọn ngày</label>
              <DatePicker
                onChange={this.handleChangePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="pick-hour-container col-12">
              <div className="pick-hour-title">Chọn khung giờ</div>
              <div className="pick-hour">
                {rangeTime &&
                  rangeTime.map((item, index) => (
                    <button
                      className={
                        item.selected === true ? "btn-time active" : "btn-time"
                      }
                      key={index}
                      onClick={() => this.handelSelectTime(item)}
                    >
                      {item.valueVi}
                    </button>
                  ))}
              </div>
            </div>
            <button className="btn btn-primary" onClick={this.handleSaveTime}>
              Lưu kế hoạch
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    scheduleHours: state.admin.scheduleHours,
    userState: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsStart: () => {
      dispatch(actions.fetchAllDoctorsStart());
    },
    fetchScheduleHourStart: () => {
      dispatch(actions.fetchScheduleHourStart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
