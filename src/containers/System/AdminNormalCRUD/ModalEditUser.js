import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.currentUser.id,
      email: this.props.currentUser.email,
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      address: this.props.currentUser.address,
    });
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  checkValidate = () => {
    let isValid = true;
    let arrKeys = ["email", "firstName", "lastName", "address"];
    for (let i = 0; i < arrKeys.length; i++) {
      if (!this.state[arrKeys[i]]) {
        alert("Missing paramator: " + arrKeys[i]);
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  handleChangeInput = (data, key) => {
    let copyData = { ...this.state };
    copyData[key] = data;
    this.setState({
      ...copyData,
    });
  };

  handleUpdateUser = () => {
    let isValid = this.checkValidate();
    if (isValid) {
      this.props.handleEditUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        className="form-modal"
        isOpen={this.props.isEditOpen}
        toggle={() => this.toggle()}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
        <ModalBody>
          <div className="form-add-new-user">
            <div className="form-input">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={(e) => {
                  this.handleChangeInput(e.target.value, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-input">
              <label for="inputAddress">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                onChange={(e) => {
                  this.handleChangeInput(e.target.value, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="form-input">
              <label for="inputAddress2">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                onChange={(e) => {
                  this.handleChangeInput(e.target.value, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="form-input max-width-input">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={(e) => {
                  this.handleChangeInput(e.target.value, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-1"
            color="primary"
            onClick={() => {
              this.toggle();
              this.handleUpdateUser();
            }}
          >
            Save change
          </Button>{" "}
          <Button
            className="px-1"
            color="secondary"
            onClick={() => this.toggle()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
