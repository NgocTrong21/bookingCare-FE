import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/AdminNormalCRUD/UserManage";
import UserRedux from "../containers/System/Admin/UserManageRedux/UserRedux";
import UserFunctionComponent from "../containers/System/Admin/UserManageByHooks/UserFunctionComponent";
import DoctorRedux from "../containers/System/Admin/DoctorRedux";
import SpecialtyManage from "../containers/System/Specialty/SpecialtyManage";
import CustomScrollbars from "../components/CustomScrollbars";
import ClinicManage from "../containers/System/Clinic/ClinicManage";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <CustomScrollbars style={{ height: "100vh", width: "100vw" }}>
            <Switch>
              {/* user manage */}
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />

              {/* doctor manage */}
              <Route path="/system/doctor-manage" component={DoctorRedux} />
              <Route
                path="/system/user-function-component"
                component={UserFunctionComponent}
              />
              <Route
                path="/system/specialty-manage"
                component={SpecialtyManage}
              />
              <Route path="/system/clinic-manage" component={ClinicManage} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </CustomScrollbars>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
