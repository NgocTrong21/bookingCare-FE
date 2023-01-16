import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router-dom";
import "./MedicalFacility.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import facilityImg from "../../../assets/images/specialty/114348-bv-viet-duc.jpg";
import { userServices } from "../../../services";
import Background from "../../../assets/images/avatar-profile.png";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinics: [],
    };
  }

  async componentDidMount() {
    let data = [];
    let res = await userServices.getAllClinic();
    if (res && res.errorCode === 0) {
      data = res.data;
    }
    this.setState(
      {
        arrClinics: data,
      },
      () => {
        console.log("check clinic", this.state.arrClinics);
      }
    );
  }

  handleViewDetailSchedule = (data) => {
    this.props.history.push(`/detail-clinic/${data.id}`);
  };

  render() {
    const settings = {
      className: "center",
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
    };
    let arrClinics = this.state.arrClinics;
    return (
      <div className="medical-facility-container">
        <div className="medical-facility-content">
          <div className="medical-facility-header">
            <div className="title-medical-facility">Cơ sở y tế nổi bật</div>
            <button>Xem thêm</button>
          </div>
          <div className="medical-facility-body">
            <Slider {...settings}>
              {arrClinics &&
                arrClinics.length > 0 &&
                arrClinics.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let name = `${item.name}`;
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailSchedule(item)}
                    >
                      <div
                        className="bg-image"
                        style={{
                          backgroundImage: `url(${
                            imageBase64 !== "" ? imageBase64 : Background
                          })`,
                        }}
                      ></div>
                      <div className="clinic-name">{name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
