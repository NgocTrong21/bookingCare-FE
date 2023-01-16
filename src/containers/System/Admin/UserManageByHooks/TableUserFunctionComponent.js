import "../TableUserRedux.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions";

const TableUserFunctionComponent = (props) => {
  const dispatch = useDispatch();
  const [arrUsers, setArrUsers] = useState([]);
  useEffect(() => {
    dispatch(actions.fetchUsersStart());
  }, [dispatch]);

  const { users } = useSelector((state) => state.admin);
  useEffect(() => {
    setArrUsers(users);
  }, [users]);

  return (
    <>
      <div
        className="users-table-redux mx-5 mt-4"
        style={{
          height: "100vh",
        }}
      >
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
                        props.handleEditUser(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-1"
                      onClick={() => {
                        props.handleDelete(item.id);
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
};

export default TableUserFunctionComponent;
