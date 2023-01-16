import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./detailClinic.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import { userServices } from "../../../services";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailClinic: "",
      arrDoctorIds: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let resClinic = await userServices.getDetailClinicById(id);
      if (resClinic && resClinic.errorCode === 0) {
        this.setState({
          detailClinic: resClinic.data,
        });
        if (
          resClinic.data.doctorInfors &&
          resClinic.data.doctorInfors.length > 0
        ) {
          this.setState({
            arrDoctorIds: resClinic.data.doctorInfors.map(
              (item) => item.doctorId
            ),
          });
        }
      }
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  render() {
    let { detailClinic, arrDoctorIds } = this.state;
    console.log("check state", this.state);
    return (
      <CustomScrollbars style={{ height: "100vh", width: "100vw" }}>
        <div className="detail-clinic-container">
          <HomeHeader />
          <div className="detail-clinic">
            <div className="detail-clinic-header">
              <h2>{detailClinic.name}</h2>
            </div>
            <div className="detail-clinic-body">
              <div className="description-clinic">
                {detailClinic && detailClinic.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailClinic.contentHTML,
                    }}
                  ></div>
                )}
              </div>
              {/* <div>
              {provinces && provinces.length > 0 && (
                <select onChange={(e) => this.onChangeSelect(e)}>
                  {provinces.map((item, index) => (
                    <option value={item.keyMap} key={index}>
                      {item.valueVi}
                    </option>
                  ))}
                </select>
              )}
            </div> */}
              <div>
                {arrDoctorIds &&
                  arrDoctorIds.length > 0 &&
                  arrDoctorIds.map((item, index) => {
                    console.log("check arrDoctor:", item);
                    return (
                      <div className="each-doctor">
                        <div className="dt-content-left">
                          <div className="profile-data">
                            <ProfileDoctor doctorId={item} />
                          </div>
                        </div>
                        <div className="dt-content-right">
                          <div className="doctor-schedule">
                            <DoctorSchedule doctorId={item} key={index} />
                          </div>
                          <div className="doctor-extra">
                            <DoctorExtraInfor doctorId={item} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
