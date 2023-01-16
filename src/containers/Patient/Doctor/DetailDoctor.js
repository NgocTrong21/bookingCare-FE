import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./detailDoctor.scss";
import { userServices } from "../../../services";
import Background from "../../../assets/images/avatar-profile.png";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import CustomScrollbars from "../../../components/CustomScrollbars";
import LoadingOverlay from "react-loading-overlay";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorDetail: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await userServices.getDetailDoctor(id);
      this.setState(
        {
          doctorDetail: res.doctors,
        },
        () => {
          console.log("check detail: ", this.state.doctorDetail);
        }
      );
    }
  }

  handleSetLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  render() {
    let position = "";
    let doctor = this.state.doctorDetail;
    let imageBase64 = doctor.image;
    if (doctor.positionData && doctor.positionData.valueVi) {
      position = doctor.positionData.valueVi;
    }
    return (
      <CustomScrollbars style={{ height: "100vh", width: "100vw" }}>
        <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
          <>
            <HomeHeader isShowBanner={false} />
            <div className="detail-doctor-container">
              <div className="intro-doctor">
                <div className="content-left">
                  <div
                    className="bg-image"
                    style={{
                      backgroundImage: `url(${
                        imageBase64 !== "" ? imageBase64 : Background
                      })`,
                    }}
                  ></div>
                </div>
                <div className="content-right">
                  <div className="up">{`${position} ${doctor.firstName} ${doctor.lastName}`}</div>
                  {doctor && doctor.Markdown && (
                    <div className="down">{doctor.Markdown.description}</div>
                  )}
                </div>
              </div>
              <div className="doctor-schedule">
                <div className="schedule-left">
                  <DoctorSchedule
                    doctorId={doctor && doctor.id ? doctor.id : -1}
                    handleSetLoading={this.handleSetLoading}
                  />
                </div>
                <div className="schedule-right">
                  <DoctorExtraInfor
                    doctorId={doctor && doctor.id ? doctor.id : -1}
                  />
                </div>
              </div>
              {doctor.Markdown && (
                <div
                  className="detail-doctor"
                  dangerouslySetInnerHTML={{
                    __html: doctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
            </div>
          </>
        </LoadingOverlay>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
