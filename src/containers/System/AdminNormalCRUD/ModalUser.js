import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
    this.handleResetState();
  };

  handleResetState = () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    });
  };

  checkValidate = () => {
    let isValid = true;
    let arrKeys = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrKeys.length; i++) {
      if (!this.state[arrKeys[i]]) {
        alert("Missing paramator: " + arrKeys[i]);
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  hanldeChangeInput = (data, key) => {
    let copyData = { ...this.state };
    copyData[key] = data;
    this.setState({
      ...copyData,
    });
  };

  handlAddNewUser = () => {
    let isValid = this.checkValidate();
    if (isValid === true) {
      this.props.getNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        className="form-modal"
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
        <ModalBody>
          <div className="form-add-new-user">
            <div className="form-input">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={(e) => {
                  this.hanldeChangeInput(e.target.value, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-input">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => {
                  this.hanldeChangeInput(e.target.value, "password");
                }}
                value={this.state.password}
              />
            </div>
            <div className="form-input">
              <label for="inputAddress">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                onChange={(e) => {
                  this.hanldeChangeInput(e.target.value, "firstName");
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
                  this.hanldeChangeInput(e.target.value, "lastName");
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
                  this.hanldeChangeInput(e.target.value, "address");
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
              this.handlAddNewUser();
              this.toggle();
            }}
          >
            Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
