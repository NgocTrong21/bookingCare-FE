import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userServices } from "../../../services";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./doctorRedux.scss";
import Select from "react-select";
import { CRUD_ACTIONS } from "../../../utils/constant";
import CustomScrollbars from "../../../components/CustomScrollbars";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctors: [],
      doctor: "",
      hasOldData: false,
      action: "",

      //required doctor infor
      listPrices: [],
      listPayments: [],
      price: "",
      payment: "",
      addressClinic: "",
      nameClinic: "",
      note: "",

      listClinics: [],
      listSpecialties: [],
      clinic: "",
      specialty: "",
      clinicId: "",
      specialtyId: "",
      provinceId: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchAllDoctorsStart();
    await this.props.fetchRequiredDoctorInforStart();
  }

  componentDidUpdate(prevProps, prevState) {
    let listDoctors = this.buildData(this.props.allDoctors, "DOCTOR");
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: listDoctors,
      });
    }

    if (prevProps.requiredDoctorInfor !== this.props.requiredDoctorInfor) {
      let { price, payment, resSpecialty, resClinic } =
        this.props.requiredDoctorInfor;

      let listPrices = this.buildData(price);
      let listPayments = this.buildData(payment);
      let listSpecialties = this.buildData(resSpecialty, "SPECIALTY");
      let listClinics = this.buildData(resClinic, "CLINIC");

      this.setState({
        listPrices,
        listPayments,
        listSpecialties,
        listClinics,
      });
    }
  }

  buildData(inputData, keyData) {
    let listData = [];
    if (inputData && inputData.length > 0) {
      if (keyData === "SPECIALTY") {
        listData = inputData.map((item, index) => ({
          value: item.id,
          label: item.name,
        }));
      } else if (keyData === "CLINIC") {
        listData = inputData.map((item, index) => ({
          value: item.id,
          label: item.name,
          address: item.address,
          provinceId: item.provinceId,
        }));
      } else {
        listData = inputData.map((item, index) => ({
          value: keyData === "DOCTOR" ? item.id : item.keyMap,
          label:
            keyData === "DOCTOR"
              ? `${item.firstName} ${item.lastName}`
              : `${item.valueVi}`,
        }));
      }
    }
    return listData;
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailInforDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.doctor.value,
      action:
        this.state.hasOldData === true
          ? CRUD_ACTIONS.EDIT
          : CRUD_ACTIONS.CREATE,
      priceId:
        this.state.price && this.state.price.value
          ? this.state.price.value
          : "",
      paymentId:
        this.state.payment && this.state.payment.value
          ? this.state.payment.value
          : "",
      addressClinic: this.state.addressClinic ? this.state.addressClinic : "",
      nameClinic: this.state.nameClinic ? this.state.nameClinic : "",
      note: this.state.note ? this.state.note : "",
      specialtyId:
        this.state.specialty && this.state.specialty.value
          ? this.state.specialty.value
          : "",
      clinicId:
        this.state.clinic && this.state.clinic.value
          ? this.state.clinic.value
          : "",
      provinceId: this.state.provinceId ? this.state.provinceId : "",
    });
  };

  handleChange = async (doctor) => {
    if (doctor) {
      let res = await userServices.getDetailDoctor(doctor.value);
      if (res && res.errorCode === 0 && res.doctors && res.doctors.Markdown) {
        let { listPrices, listPayments, listSpecialties, listClinics } =
          this.state;
        let price = "",
          payment = "",
          addressClinic = "",
          nameClinic = "",
          note = "",
          specialty = "",
          clinic = "";

        if (res.doctors.Doctor_Infor) {
          addressClinic = res.doctors.Doctor_Infor.addressClinic
            ? res.doctors.Doctor_Infor.addressClinic
            : "";
          nameClinic = res.doctors.Doctor_Infor.nameClinic
            ? res.doctors.Doctor_Infor.nameClinic
            : "";
          note = res.doctors.Doctor_Infor.note
            ? res.doctors.Doctor_Infor.note
            : "";

          price = listPrices.find(
            (item) => item.value === res.doctors.Doctor_Infor.priceId
          );
          payment = listPayments.find(
            (item) => item.value === res.doctors.Doctor_Infor.paymentId
          );
          specialty = listSpecialties.find(
            (item) => item.value === res.doctors.Doctor_Infor.specialtyId
          );
          clinic = listClinics.find(
            (item) => item.value === res.doctors.Doctor_Infor.clinicId
          );
          this.setState({
            addressClinic: addressClinic,
            nameClinic: nameClinic,
            note: note,
            price: price,
            payment: payment,
            specialty: specialty,
            clinic: clinic,
            nameClinic: clinic && clinic.label ? clinic.label : "",
            addressClinic: clinic && clinic.address ? clinic.address : "",
            provinceId: clinic && clinic.provinceId ? clinic.provinceId : "",
          });
        }

        let markDown = res.doctors.Markdown;
        if (markDown) {
          if (
            markDown.contentHTML &&
            markDown.contentHTML &&
            markDown.description
          ) {
            this.setState({
              contentMarkdown: markDown.contentMarkdown,
              contentHTML: markDown.contentHTML,
              description: markDown.description,
              hasOldData: true,
              doctor: doctor,
            });
          } else {
            this.setState({
              contentMarkdown: "",
              contentHTML: "",
              description: "",
              hasOldData: false,
              doctor: doctor,
            });
          }
        }
      }
    }
  };

  handleOnChangeText = (e, key) => {
    let copyState = this.state;
    copyState[key] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleChangeDoctorInfor = (data, name) => {
    if (data) {
      if (name.name === "clinic") {
        let clinic = this.state.listClinics.find(
          (item) => item.value === data.value
        );
        this.setState({
          clinic: data,
          nameClinic: data.label,
          addressClinic: clinic.address,
          provinceId: clinic.provinceId,
        });
      } else {
        let copyState = this.state;
        copyState[name.name] = data;
        this.setState({
          ...copyState,
        });
      }
    }
  };
  render() {
    console.log("check clinic state: ", this.state);
    let { price, payment, note, specialty, clinic } = this.state;
    return (
      <CustomScrollbars style={{ height: "90vh", width: "100vw" }}>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">Qu???n l?? b??c s??</div>
          <div className="manage-doctor-header">
            <div className="left-content form-group">
              <label>Ch???n b??c s??</label>
              <Select
                value={this.state.doctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
                placeholder="Ch???n b??c s??"
              />
            </div>
            <div className="right-content form-group">
              <label>Th??ng tin gi???i thi???u b??c s??</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(e) => {
                  this.handleOnChangeText(e, "description");
                }}
                value={this.state.description}
                placeholder="??i???n th??ng tin gi???i thi???u b??c s??"
              >
                Fill this content
              </textarea>
            </div>
          </div>
          <div className="manage-doctor-extra row">
            <div className="col-4 form-group">
              <label>Gi?? th??nh</label>
              <Select
                placeholder="Ch???n gi?? th??nh"
                options={this.state.listPrices}
                name="price"
                onChange={this.handleChangeDoctorInfor}
                value={price}
              />
            </div>
            <div className="col-4 form-group">
              <label>Ph????ng th???c thanh to??n</label>
              <Select
                placeholder="Ch???n ph????ng th???c thanh to??n"
                options={this.state.listPayments}
                name="payment"
                onChange={this.handleChangeDoctorInfor}
                value={payment}
              />
            </div>
            <div className="col-4 form-group">
              <label>Ch???n chuy??n khoa</label>
              <Select
                placeholder="Chuy??n khoa"
                options={this.state.listSpecialties}
                name="specialty"
                value={specialty}
                onChange={this.handleChangeDoctorInfor}
              />
            </div>
            <div className="col-4 form-group">
              <label>Ch???n ph??ng kh??m</label>
              <Select
                placeholder="Ph??ng kh??m"
                options={this.state.listClinics.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
                name="clinic"
                value={clinic}
                onChange={this.handleChangeDoctorInfor}
              />
            </div>
            <div className="col-4 form-group">
              <label>Ghi ch??</label>
              <input
                className="form-control"
                value={note}
                onChange={(e) => this.handleOnChangeText(e, "note")}
                placeholder="Ghi ch??"
              ></input>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "420px", marginBottom: "30px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <div className="btn">
            <button
              className={
                this.state.hasOldData === true
                  ? "save-content-doctor"
                  : "create-content-doctor"
              }
              onClick={() => {
                this.handleSaveContentMarkdown();
              }}
            >
              {this.state.hasOldData === true
                ? "L??u th??ng tin"
                : "T???o th??ng tin"}
            </button>
          </div>
        </div>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    allDoctors: state.admin.allDoctors,
    requiredDoctorInfor: state.admin.requiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersStart: () => {
      dispatch(actions.fetchUsersStart());
    },
    deleteUserStart: (userId) => {
      dispatch(actions.deleteUserStart(userId));
    },
    fetchAllDoctorsStart: () => {
      dispatch(actions.fetchAllDoctorsStart());
    },
    saveDetailInforDoctor: (data) => {
      dispatch(actions.saveDetailDoctorStart(data));
    },
    fetchRequiredDoctorInforStart: () => {
      dispatch(actions.fetchRequiredDoctorInforStart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRedux);
