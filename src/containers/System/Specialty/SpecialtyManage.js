import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "./specialtyManage.scss";
import CommonUtils from "../../../utils/CommonUtils";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Background from "../../../assets/images/avatar-profile.png";
import { userServices } from "../../../services";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: "",
      previewImage: "",
      valueImage: "",
      avatar: "",
      isOpen: false,
      contentMarkdown: "",
      contentHTML: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  handleOnChangeText = (e) => {
    this.setState({
      nameSpecialty: e.target.value,
    });
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let previewData = URL.createObjectURL(file);
      this.setState({
        previewImage: previewData,
        valueImage: e.target.value,
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
      valueImage: "",
      avatar: "",
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContent = async () => {
    console.log("check state", this.state);
    let res = await userServices.postSpecialty({
      name: this.state.nameSpecialty,
      image: this.state.avatar,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
    });
    if (res && res.errorCode === 0) {
      toast.success("Create specialty succeed!");
      this.setState({
        nameSpecialty: "",
        previewImage: "",
        valueImage: "",
        avatar: "",
        contentMarkdown: "",
        contentHTML: "",
      });
    } else {
      toast.error(res.message);
    }
  };

  render() {
    return (
      <CustomScrollbars style={{ height: "95vh", width: "100vw" }}>
        <div className="manage-specialty-container">
          <div className="title">Quản lý chuyên khoa</div>
          <div className="specialty-content">
            <div className="col-6 form-group">
              <label>Tên chuyên khoa</label>
              <input
                className="form-control"
                value={this.state.nameSpecialty}
                onChange={(e) => this.handleOnChangeText(e)}
                placeholder="Tên chuyên khoa"
              ></input>
            </div>
            <div className="user-redux-image">
              <div className="title-image">Avatar</div>
              <label htmlFor="userImage">
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
                id="userImage"
                name="user-image"
                type="file"
                hidden
                value={this.state.valueImage}
                onChange={(e) => this.handleOnChangeImage(e)}
              />
              {this.state.previewImage && (
                <div className="btn-view">
                  <button
                    className="btn-view-left"
                    onClick={this.handleViewImage}
                  >
                    View Image
                  </button>
                  <button
                    className="btn-view-right"
                    onClick={this.handleResetImage}
                  >
                    Clear
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
          <div className="manage-doctor-editor">
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
