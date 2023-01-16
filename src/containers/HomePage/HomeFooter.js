import React, { Component } from "react";
import { connect } from "react-redux";
import "./homeFooter.scss";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  render() {
    return (
      <div className="footer-container">
        <div className="footer-up">
          <div className="footer-content">
            <div className="footer-left">
              <div className="logo-footer"></div>
              <div className="name-text">
                Công ty Cổ phần Công nghệ BookingCare
              </div>
              <div className="address-text">
                <i class="fas fa-map-marker-alt"></i> 28 Thành Thái, Dịch Vọng,
                Cầu Giấy, Hà Nội
              </div>
              <div className="extra-text">
                <i class="fas fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội
                cấp ngày 16/03/2015
              </div>
            </div>
            <div className="footer-right">
              <div className="content-left">
                <ul className="option">
                  <li>
                    <a href="https://bookingcare.vn/">Liên hệ hợp tác</a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">
                      Gói chuyển đổi số doanh nghiệp
                    </a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">Tuyển dụng</a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">Câu hỏi thường gặp</a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">Điều khoản sử dụng</a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">Chính sách Bảo mật</a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">
                      Quy trình hỗ trợ giải quyết khiếu nại
                    </a>
                  </li>
                  <li>
                    <a href="https://bookingcare.vn/">Quy chế hoạt động</a>
                  </li>
                </ul>
              </div>
              <div className="content-right">
                <div className="content-right-body">
                  <div className="content-right-title">Trụ sở tại Hà Nội</div>
                  <div>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                </div>
                <div className="content-right-body">
                  <div className="content-right-title">
                    Văn phòng tại TP Hồ Chí Minh
                  </div>
                  <div>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
                </div>
                <div className="content-right-body">
                  <div className="content-right-title">Hỗ trợ khách hàng</div>
                  <div>support@bookingcare.vn (7h - 18h)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-down">
          <div className="footer-bottom">
            <div className="footer-bottom-text">© 2023 BookingCare.</div>
            <div className="icon">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-youtube"></i>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
