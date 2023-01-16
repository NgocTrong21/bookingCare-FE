import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions";
import TableUserFunctionComponent from "./TableUserFunctionComponent";
import { CRUD_ACTIONS } from "../../../../utils/constant";

const UserFunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchGenderStart());
    dispatch(actions.fetchRoleStart());
  }, [dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [arrGenders, setArrGenders] = useState([]);
  const [arrRoles, setArrRoles] = useState([]);
  const [userIdEdit, setUserIdEdit] = useState();
  const [action, setAction] = useState("");

  const { genders, roles, users } = useSelector((state) => state.admin);
  useEffect(() => {
    setArrGenders(genders);
    setArrRoles(roles);
    setRole(arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "");
    setGender(arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "");
  }, [genders, roles]);

  useEffect(() => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress("");
    setPassword("");
    setRole(arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "");
    setGender(arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "");
    setAction(CRUD_ACTIONS.CREATE);
  }, [users]);

  const checkValidateInput = () => {
    let isValid = false;
    let arrKeyState = [
      "email",
      "phoneNumber",
      "password",
      "firstName",
      "lastName",
      "address",
      "gender",
      "role",
    ];
    const state = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      role,
    };
    for (let i = 0; i < arrKeyState.length; i++) {
      if (!state[arrKeyState[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrKeyState[i]);
        break;
      } else {
        isValid = true;
      }
    }
    return isValid;
  };

  const handleSaveUser = () => {
    if (checkValidateInput() === true) {
      if (action === CRUD_ACTIONS.CREATE) {
        dispatch(
          actions.createUserStart({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phonenumber: phoneNumber,
            gender: gender,
            roleId: role,
          })
        );
      }
      if (action === CRUD_ACTIONS.EDIT) {
        console.log("edit user start");
        dispatch(
          actions.editUserStart({
            id: userIdEdit,
            firstName: firstName,
            lastName: lastName,
            address: address,
            gender: gender,
            phonenumber: phoneNumber,
            roleId: role,
          })
        );
      }
    }
  };

  const handleEditUser = (user) => {
    setEmail(user.email);
    setPassword("HARDCODE");
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAddress(user.address);
    setPhoneNumber(user.phonenumber);
    setGender(user.gender);
    setRole(user.roleId);
    setUserIdEdit(user.id);
    setAction(CRUD_ACTIONS.EDIT);
  };

  const handleDelete = (userId) => {
    dispatch(actions.deleteUserStart(userId));
  };
  return (
    <>
      <div>
        <div className="user-redux-container">
          <div className="title">User Redux by hook hoi dan It</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <form className="col-12">
                  <div className="form-row">
                    <div className="col-12 mt-3">Create a new user</div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputAddress">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputAddress2">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="inputAddress">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputCity">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phonenumber"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputState">Sex</label>
                      <select
                        name="gender"
                        className="form-control"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        value={gender}
                      >
                        {arrGenders &&
                          arrGenders.length > 0 &&
                          arrGenders.map((item, index) => (
                            <option key={index} value={item.key}>
                              {item.valueEn}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputZip">Role</label>
                      <select
                        name="roleId"
                        className="form-control"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        value={role}
                      >
                        {arrRoles &&
                          arrRoles.length > 0 &&
                          arrRoles.map((item, index) => (
                            <option key={index} value={item.key}>
                              {item.valueEn}
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
                      handleSaveUser();
                    }}
                  >
                    {action === CRUD_ACTIONS.EDIT ? "Edit User" : "Create"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TableUserFunctionComponent
        handleDelete={handleDelete}
        handleEditUser={handleEditUser}
      />
    </>
  );
};

export default UserFunctionComponent;
