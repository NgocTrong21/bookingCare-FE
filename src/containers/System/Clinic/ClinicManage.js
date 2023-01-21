import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import Select from "react-select";
import "./clinicManage.scss";
import CommonUtils from "../../../utils/CommonUtils";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Background from "../../../assets/images/building-avatar.jpg";
import { userServices } from "../../../services";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClinic: "",
      addressClinic: "",
      selectedProvince: "",
      previewImage: "",
      avatar: "",
      isOpen: false,
      contentMarkdown: "",
      contentHTML: "",
      listProvinces: [],
    };
  }

  async componentDidMount() {
    let resProvinces = await userServices.getAllCode("PROVINCE");
    if (resProvinces && resProvinces.errorCode === 0) {
      this.setState({
        listProvinces: resProvinces.data,
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  buildData(inputData) {
    let listData = [];
    if (inputData && inputData.length > 0) {
      listData = inputData.map((item, index) => ({
        value: item.keyMap,
        label: item.valueVi,
      }));
    }
    return listData;
  }

  handleOnChangeText = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let previewData = URL.createObjectURL(file);
      this.setState({
        previewImage: previewData,
        avatar: base64,
      });
    }
  };

  handleViewImage = () => {
    if (this.state.previewImage) {
      this.setState({
        isOpen: true,
      });
    }
  };

  handleResetImage = () => {
    this.setState({
      previewImage: "",
      avatar: "",
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeProvince = (province) => {
    this.setState({
      selectedProvince: province,
    });
  };

  handleSaveContent = async () => {
    let res = await userServices.postClinic({
      name: this.state.nameClinic,
      address: this.state.addressClinic,
      provinceId: this.state.selectedProvince.value,
      image: this.state.avatar,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
    });
    if (res && res.errorCode === 0) {
      toast.success("Create specialty succeed!");
      this.setState({
        nameClinic: "",
        addressClinic: "",
        selectedProvince: "",
        provinceId: "",
        previewImage: "",
        avatar: "",
        contentMarkdown: "",
        contentHTML: "",
      });
    } else {
      toast.error(res.message);
    }
  };

  render() {
    console.log("check state clinic: ", this.state);

    return (
      <CustomScrollbars style={{ height: "95vh", width: "100vw" }}>
        <div className="manage-clinic-container">
          <div className="title">Quản lý phòng khám</div>
          <div className="clinic-body">
            <div className="clinic-content">
              <div className="col-10 form-group">
                <label>Tên phòng khám</label>
                <input
                  className="form-control"
                  value={this.state.nameClinic}
                  onChange={this.handleOnChangeText}
                  placeholder="Tên phòng khám"
                  name="nameClinic"
                ></input>
              </div>
              <div className="col-10 form-group">
                <label>Địa chỉ phòng khám</label>
                <input
                  className="form-control"
                  value={this.state.addressClinic}
                  onChange={this.handleOnChangeText}
                  placeholder="Địa chỉ phòng khám"
                  name="addressClinic"
                ></input>
              </div>
              <div className="col-10 form-group">
                <label>Tỉnh thành</label>
                <Select
                  placeholder="Tỉnh thành"
                  options={this.buildData(this.state.listProvinces)}
                  onChange={this.handleChangeProvince}
                  name="province"
                  value={this.state.selectedProvince}
                />
              </div>
            </div>
            <div className="clinic-image">
              <div className="title-image">Ảnh phòng khám</div>
              <label htmlFor="clinicImage">
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${
                      this.state.previewImage !== ""
                        ? this.state.previewImage
                        : Background
                    })`,
                  }}
                ></div>
              </label>
              <input
                id="clinicImage"
                name="clinic-image"
                type="file"
                value=""
                hidden
                onChange={(e) => this.handleOnChangeImage(e)}
              />
              {this.state.previewImage && (
                <div className="btn-view">
                  <button
                    className="btn-view-left"
                    onClick={this.handleViewImage}
                  >
                    Xem ảnh
                  </button>
                  <button
                    className="btn-view-right"
                    onClick={this.handleResetImage}
                  >
                    Xoá ảnh
                  </button>
                </div>
              )}
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImage}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
          <div className="manage-clinic-editor">
            <MdEditor
              style={{ height: "420px", marginBottom: "30px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <div className="btn">
            <button onClick={() => this.handleSaveContent()}>
              Lưu thông tin
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
