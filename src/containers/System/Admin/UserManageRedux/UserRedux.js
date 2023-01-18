import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { CRUD_ACTIONS } from "../../../../utils/constant";
import CommonUtils from "../../../../utils/CommonUtils";
import * as actions from "../../../../store/actions";
import TableUserRedux from "./TableUserRedux";
import "./userRedux.scss";
import CustomScrollbars from "../../../..//components/CustomScrollbars";
import Background from "../../../../assets/images/avatar-profile.png";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGenders: [],
      arrRoles: [],
      arrPositions: [],
      previewImage: "",
      valueImage: "",
      avatar: "",
      isOpen: false,

      email: "",
      phonenumber: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      role: "",
      position: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchGenderStart();
    await this.props.fetchRoleStart();
    await this.props.fetchPositionStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderArr = this.props.genderRedux;
      this.setState({
        arrGenders: genderArr,
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let roleArr = this.props.roleRedux;
      this.setState({
        arrRoles: roleArr,
        role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positionArr = this.props.positionRedux;
      this.setState({
        arrPositions: positionArr,
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      let genderArr = this.props.genderRedux;
      let roleArr = this.props.roleRedux;
      let positionArr = this.props.positionRedux;
      this.setState({
        email: "",
        phonenumber: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
        role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
        action: CRUD_ACTIONS.CREATE,
        previewImage: "",
        avatar: "",
        valueImage: "",
      });
    }
  }

  checkValidateInput = () => {
    let isValid = false;
    let arrKeyState = [
      "email",
      "phonenumber",
      "password",
      "firstName",
      "lastName",
      "gender",
      "role",
      "position",
    ];
    for (let i = 0; i < arrKeyState.length; i++) {
      if (!this.state[arrKeyState[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrKeyState[i]);
        break;
      } else {
        isValid = true;
      }
    }
    return isValid;
  };

  onChangeInput = (value, key) => {
    let copyState = { ...this.state };
    copyState[key] = value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveUser = () => {
    if (this.checkValidateInput() === true) {
      let {
        email,
        phonenumber,
        password,
        firstName,
        lastName,
        gender,
        role,
        position,
        avatar,
      } = this.state;
      let newUser = {
        email,
        phonenumber,
        password,
        firstName,
        lastName,
        gender,
        role,
        position,
        avatar,
      };

      if (this.state.action === CRUD_ACTIONS.CREATE) {
        this.props.createUserStart(newUser);
      }
      if (this.state.action === CRUD_ACTIONS.EDIT) {
        this.props.editUserStart({
          id: this.state.userEditId,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          phonenumber: phonenumber,
          roleId: role,
          positionId: position,
          image: avatar,
        });
      }
    }
  };

  handleEditUserRedux = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    let positionArr = this.props.positionRedux;
    this.setState({
      email: user.email,
      phonenumber: user.phonenumber,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
      previewImage: imageBase64,
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
  render() {
    let genders = this.state.arrGenders;
    let roles = this.state.arrRoles;
    let positions = this.state.arrPositions;

    let {
      email,
      phonenumber,
      password,
      firstName,
      lastName,
      gender,
      role,
      position,
    } = this.state;
    return (
      <>
        <CustomScrollbars style={{ height: "90vh", width: "100vw" }}>
          <div className="user-redux-container">
            <div className="title">Quản lý người dùng hệ thống</div>
            <div className="user-redux-body">
              <div className="container">
                <div className="row">
                  <form className="col-12">
                    <div className="form-row">
                      <div className="title-create col-12 mt-3">
                        Thêm mới người dùng
                      </div>
                      {this.props.isLoading && (
                        <div className="col-12 mt-3 mb-3">Loading</div>
                      )}
                      <div className="form-group col-md-3">
                        <label htmlFor="inputEmail4">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "email");
                          }}
                          disabled={
                            this.state.action === CRUD_ACTIONS.EDIT
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputPassword4">Mật khẩu</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "password");
                          }}
                          disabled={
                            this.state.action === CRUD_ACTIONS.EDIT
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Họ</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={firstName}
                          placeholder="Họ"
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "firstName");
                          }}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputAddress2">Tên</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={lastName}
                          placeholder="Tên"
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "lastName");
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label htmlFor="inputCity">Số điện thoại</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phonenumber"
                          value={phonenumber}
                          placeholder="Số điện thoại"
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "phonenumber");
                          }}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputState">Giới tính</label>
                        <select
                          name="gender"
                          className="form-control"
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "gender");
                          }}
                          value={gender}
                        >
                          {genders &&
                            genders.length > 0 &&
                            genders.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputZip">Vai trò</label>
                        <select
                          name="roleId"
                          className="form-control"
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "role");
                          }}
                          value={role}
                        >
                          {roles &&
                            roles.length > 0 &&
                            roles.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputZip">Chức vụ</label>
                        <select
                          name="positionId"
                          className="form-control"
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "position");
                          }}
                          value={position}
                        >
                          {positions &&
                            positions.length > 0 &&
                            positions.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleSaveUser();
                      }}
                    >
                      {this.state.action === CRUD_ACTIONS.EDIT
                        ? "Edit User"
                        : "Create"}
                    </button>
                  </form>
                </div>
              </div>
              <div className="user-redux-image">
                <div className="title-image">Ảnh đại diện</div>
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
          </div>
          <TableUserRedux
            className="m-3"
            handleEditUserRedux={this.handleEditUserRedux}
          />
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImage}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </CustomScrollbars>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoading: state.admin.isLoading,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => {
      dispatch(actions.fetchGenderStart());
    },
    fetchRoleStart: () => {
      dispatch(actions.fetchRoleStart());
    },
    fetchPositionStart: () => {
      dispatch(actions.fetchPositionStart());
    },
    createUserStart: (data) => {
      dispatch(actions.createUserStart(data));
    },
    fetchUsersStart: () => {
      dispatch(actions.fetchUsersStart());
    },
    editUserStart: (user) => {
      dispatch(actions.editUserStart(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
