import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import "./doctorExtraInfor.scss";
import { userServices } from "../../../services";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import { getExtraDoctorInforById } from "../../../services/userService";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      extraInfor: "",
    };
  }

  async componentDidMount() {
    let res = await getExtraDoctorInforById(this.props.doctorId);
    if (res && res.errorCode === 0) {
      this.setState({
        extraInfor: res.data,
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.doctorId !== this.props.doctorId) {
      let res = await getExtraDoctorInforById(this.props.doctorId);
      if (res && res.errorCode === 0) {
        this.setState(
          {
            extraInfor: res.data,
          },
          () => {
            console.log("extra doctor:", this.state.extraInfor);
          }
        );
      }
    }
  };

  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    let extraData = this.state.extraInfor;
    let { paymentTypeData, priceTypeData, provinceTypeData } =
      this.state.extraInfor;
    let { detailClinic } = extraData;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">
            {detailClinic && detailClinic.name ? detailClinic.name : ""}
          </div>
          <div className="detail-address">
            {detailClinic && detailClinic.address ? detailClinic.address : ""}
          </div>
        </div>
        <div className="content-down">
          {this.state.isOpen === false && (
            <div>
              <span className="price">
                {"Giá khám: "}
                {priceTypeData && priceTypeData.valueVi ? (
                  <NumberFormat
                    value={priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                ) : (
                  ""
                )}
              </span>
              <span className="option" onClick={this.handleOpen}>
                Xem chi tiết
              </span>
            </div>
          )}
          {this.state.isOpen === true && (
            <>
              <div className="detail-price">
                <span>Giá khám</span>
                <span>
                  {" "}
                  {priceTypeData && priceTypeData.valueVi ? (
                    <NumberFormat
                      value={priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="note">
                {this.state.extraInfor && this.state.extraInfor.note
                  ? this.state.extraInfor.note
                  : ""}
              </div>
              {paymentTypeData && paymentTypeData.valueVi ? (
                <div className="payment">
                  {`Phòng khám có thanh toán bằng hình thức: ${paymentTypeData.valueVi}`}
                </div>
              ) : (
                ""
              )}

              <div className="option" onClick={this.handleOpen}>
                Ẩn bảng giá
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
