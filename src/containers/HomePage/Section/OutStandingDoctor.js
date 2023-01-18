import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import "./outStandingDoctor.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import Background from "../../../assets/images/avatar-profile.png";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }

  handleViewDetailDoctor = (data) => {
    console.log("detail doctor: ", data);
    this.props.history.push(`/detail-doctor/${data.id}`);
  };

  render() {
    let allDoctors = this.state.arrDoctors;
    console.log("all doctors: ", allDoctors);
    const settings = {
      className: "center",
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
    };

    return (
      <div className="outstanding-doctor-container">
        <div className="outstanding-doctor-content">
          <div className="outstanding-doctor-header">
            <div className="title-outstanding-doctor">Bác sĩ nổi bật</div>
            <button>Xem thêm</button>
          </div>
          <div className="outstanding-doctor-body">
            <Slider {...settings}>
              {allDoctors &&
                allDoctors.length > 0 &&
                allDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let name = `${item.positionData.ValueVi} ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="bg-image"
                        style={{
                          backgroundImage: `url(${
                            imageBase64 !== "" ? imageBase64 : Background
                          })`,
                        }}
                      ></div>
                      <div className="doctor-name">{name}</div>
                      <div>{item.Doctor_Infor.detailSpecialty.name || ""}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorRedux: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => {
      dispatch(actions.fetchTopDoctor());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
