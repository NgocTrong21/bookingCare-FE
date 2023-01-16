import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router-dom";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userServices } from "../../../services";
import specialtyImg from "../../../assets/images/specialty/121042-than-kinh.jpg";
import Background from "../../../assets/images/avatar-profile.png";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialties: [],
    };
  }

  async componentDidMount() {
    let data = [];
    let res = await userServices.getAllSpecialty();
    if (res && res.errorCode === 0) {
      data = res.data;
    }
    this.setState(
      {
        arrSpecialties: data,
      },
      () => {
        console.log("check specialty", this.state.arrSpecialties);
      }
    );
  }

  handleViewDetailSchedule = (data) => {
    this.props.history.push(`/detail-specialty/${data.id}`);
  };

  render() {
    const settings = {
      className: "center",
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
    };
    let arrSpecialties = this.state.arrSpecialties;
    return (
      <div className="specialty-container">
        <div className="specialty-content">
          <div className="specialty-header">
            <div className="title-specialty">Chuyên khoa phổ biến</div>
            <button>Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              {arrSpecialties &&
                arrSpecialties.length > 0 &&
                arrSpecialties.map((item, index) => {
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
                      <div className="specialty-name">{name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
