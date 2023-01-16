import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userServices } from "../../../../services";
import * as actions from "../../../../store/actions";
import "../TableUserRedux.scss";
import "react-markdown-editor-lite/lib/index.css";

class TableUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  async componentDidMount() {
    await this.props.fetchUsersStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      let users = this.props.users;
      this.setState({
        usersRedux: users,
      });
    }
  }

  handleDeleteUser = (userId) => {
    this.props.deleteUserStart(userId);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserRedux(user);
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <div className="users-table-redux mt-4 mx-5 my-5">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Adress</th>
                <th>Actions</th>
              </tr>
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="mx-1"
                        onClick={() => {
                          this.handleEditUser(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="mx-1"
                        onClick={() => {
                          this.handleDeleteUser(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
