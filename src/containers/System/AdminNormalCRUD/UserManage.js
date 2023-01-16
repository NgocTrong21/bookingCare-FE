import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { userServices } from "../../../services";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isEditOpen: false,
      currentUser: "",
    };
  }

  async componentDidMount() {
    await this.getAllUsersService();
  }

  getAllUsersService = async () => {
    let response = await userServices.getAllUsers("ALL");
    if (response && response.errorCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  getNewUser = async (data) => {
    console.log("New user from userManage: ", data);
    try {
      let response = await userServices.getPostNewUser(data);
      if (response && response.errorCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersService();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  handleOpenEditUser = () => {
    this.setState({
      isEditOpen: true,
    });
  };

  getCurrentUser = (userData) => {
    this.setState({
      currentUser: userData,
    });
  };

  handleEditUser = async (userData) => {
    try {
      let res = await userServices.editUser(userData);
      if (res && res.errorCode === 0) {
        await this.getAllUsersService();
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (userId) => {
    try {
      let response = await userServices.deleteUser(userId);
      if (response && response.errorCode === 0) {
        await this.getAllUsersService();
      } else {
        alert(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  toggleModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggelEditUser = () => {
    this.setState({
      isEditOpen: !this.state.isEditOpen,
    });
  };

  render() {
    let dataUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="title text-center">Manage users with Eric</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            Add New User
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Adress</th>
                <th>Actions</th>
              </tr>
              {dataUsers &&
                dataUsers.map((dataUser, index) => {
                  return (
                    <tr key={index}>
                      <td>{dataUser.email}</td>
                      <td>{dataUser.firstName}</td>
                      <td>{dataUser.lastName}</td>
                      <td>{dataUser.address}</td>
                      <td>
                        <button
                          className="mx-1"
                          onClick={() => {
                            this.handleOpenEditUser();
                            this.getCurrentUser(dataUser);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="mx-1"
                          onClick={() => {
                            this.handleDeleteUser(dataUser.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleModal}
          getNewUser={this.getNewUser}
        />
        {this.state.isEditOpen && (
          <ModalEditUser
            isEditOpen={this.state.isEditOpen}
            toggleFromParent={this.toggelEditUser}
            currentUser={this.state.currentUser}
            handleEditUser={this.handleEditUser}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
