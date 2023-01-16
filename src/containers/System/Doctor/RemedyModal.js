import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import _ from "lodash";
import CommonUtils from "../../../utils/CommonUtils";
import { userServices } from "../../../services";
import moment from "moment";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      emailPatient: "",
      fileBase64: "",
    };
  }

  async componentDidMount() {
    // if (this.props.dataModal) {
    //   this.setState({
    //     emailPatient: this.props.dataModal.email,
    //   });
    // }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps !== this.props) {
      this.setState({
        emailPatient: this.props.dataModal.email,
      });
    }
    if (prevProps.isOpenRemedy !== this.props.isOpenRemedy) {
      this.setState({
        isOpenModal: this.props.isOpenRemedy,
      });
    }
  };

  buildTimeBooking = (selectedTime) => {
    if (selectedTime && !_.isEmpty(selectedTime)) {
      let date = moment
        .unix(+selectedTime.date / 1000)
        .format("dddd - DD/MM/YYYY");
      let formatDate = date.charAt(0).toUpperCase() + date.slice(1);
      return `${selectedTime.time} ${formatDate}`;
    }
    return "";
  };

  handleChangeEmail = (e) => {
    this.setState({
      emailPatient: e.target.value,
    });
  };

  handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      if (base64) {
        this.setState({
          fileBase64: base64,
        });
      }
    }
  };

  handleConfirm = async () => {
    let inputData = {
      date: this.props.dataModal.date,
      patientId: this.props.dataModal.id,
      doctorId: this.props.dataModal.doctorId,
      timeString: this.buildTimeBooking({
        time: this.props.dataModal.bookingTime.valueVi,
        date: this.props.dataModal.date,
      }),
      namePatient: this.props.dataModal.lastName,
      fileBase64: this.state.fileBase64,
      email: this.props.dataModal.email,
    };
    // console.log("input data send", inputData);
    this.props.handleSetLoading();
    let res = await userServices.confirmRemedy(inputData);
    if (res && res.errorCode === 0) {
      toast.success("Send remedy succeed!");
      this.props.handleSetLoading();
    } else {
      toast.error(res.message);
    }
    this.props.handleToggle();
    this.props.getListPatientData();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpenModal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          centered
        >
          <div class="modal-header">
            <h5 class="modal-title">Xác nhận khám xong và gửi đơn thuốc</h5>
            <button type="button" class="close" aria-label="Close">
              <span aria-hidden="true" onClick={this.props.handleToggle}>
                ×
              </span>
            </button>
          </div>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Email người nhận</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChangeEmail}
                    value={this.state.emailPatient}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Chọn file đính kèm</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={this.handleChangeFile}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleConfirm}>
              Xác nhận
            </Button>{" "}
            <Button color="secondary" onClick={this.props.handleToggle}>
              Huỷ
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
