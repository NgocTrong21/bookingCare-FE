import React, { Component } from "react";
import { connect } from "react-redux";
import "./detailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import CustomScrollbars from "../../../components/CustomScrollbars";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { userServices } from "../../../services";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorIds: [],
      doctorDetail: [],
      detailSpecialty: {},
      provinces: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = "ALL";
      let data = {
        id,
        location,
      };
      let res = await userServices.getDetailSpecialtyById(data);
      if (res && res.errorCode === 0) {
        this.setState({
          doctorDetail: res.data.doctorInfors,
          detailSpecialty: res.data,
        });

        if (res.data.doctorInfors && res.data.doctorInfors.length > 0) {
          let arrDoctorIds = [];
          let doctors = res.data.doctorInfors;
          arrDoctorIds = doctors.map((doctor, index) => {
            return doctor.doctorId;
          });
          this.setState({
            arrDoctorIds: arrDoctorIds,
          });
        }
      }
    }
    let resProvinces = await userServices.getAllCode("PROVINCE");
    if (resProvinces && resProvinces.errorCode === 0) {
      let provinces = [
        {
          keyMap: "ALL",
          valueVi: "Tất cả",
        },
        ...resProvinces.data,
      ];
      this.setState({
        provinces: provinces,
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  onChangeSelect = async (e) => {
    let arrDoctorIds = [];
    let doctorDetail = [];
    let location = e.target.value;
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let data = {
        id: this.props.match.params.id,
        location,
      };
      let res = await userServices.getDetailSpecialtyById(data);
      if (res && res.errorCode === 0) {
        if (res.data.doctorInfors && res.data.doctorInfors.length > 0) {
          doctorDetail = res.data.doctorInfors;
          arrDoctorIds = doctorDetail.map((item, index) => {
            return item.doctorId;
          });
        }
        this.setState({
          doctorDetail,
          arrDoctorIds,
          detailSpecialty: res.data,
        });
      }
    }
  };

  render() {
    let { arrDoctorIds, detailSpecialty, provinces } = this.state;
    console.log("check state:", this.state);
    return (
      <CustomScrollbars style={{ height: "100vh", width: "100vw" }}>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty">
            <div className="detail-specialty-header">
              <h2>{detailSpecialty.name}</h2>
            </div>
            <div className="detail-specialty-body">
              <div className="description-specialty">
                {detailSpecialty && detailSpecialty.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailSpecialty.contentHTML,
                    }}
                  ></div>
                )}
              </div>
              <div>
                {provinces && provinces.length > 0 && (
                  <select onChange={(e) => this.onChangeSelect(e)}>
                    {provinces.map((item, index) => (
                      <option value={item.keyMap} key={index}>
                        {item.valueVi}
                      </option>
                    ))}
                  </select>
                )}
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
