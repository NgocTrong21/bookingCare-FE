import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { withRouter } from "react-router-dom";

class Home extends Component {
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => {
                  this.returnHome();
                }}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>Chuyên khoa</b>
                  <div>Tìm bác sĩ theo chuyên khoa</div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                  <div>Chọn phòng khám</div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                  <div>Chọn bác sĩ giỏi</div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                  <div>Khám sức khoẻ tổng quát</div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i class="fas fa-question-circle"></i> Hỗ trợ
              </div>
            </div>
          </div>
          {this.props.isShowBanner && (
            <div className="home-header-banner">
              <div className="content-up">
                <div className="title1">NỀN TẢNG Y TẾ</div>
                <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                <div className="search">
                  <i class="fas fa-search"></i>
                  <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                </div>
              </div>
              <div className="content-down">
                <div className="options">
                  <div className="option-child">
                    <div className="icon-child">
                      <i class="fas fa-building"></i>
                    </div>
                    <div className="text-child">Khám Chuyên khoa</div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i class="fas fa-building"></i>
                    </div>
                    <div className="text-child">Khám từ xa</div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i class="fas fa-building"></i>
                    </div>
                    <div className="text-child">Khám tổng quát</div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i class="fas fa-building"></i>
                    </div>
                    <div className="text-child">Xét nghiệm y học</div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i class="fas fa-building"></i>
                    </div>
                    <div className="text-child">Sức khoẻ tinh thần</div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i class="fas fa-building"></i>
                    </div>
                    <div className="text-child">Khám nha khoa</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
