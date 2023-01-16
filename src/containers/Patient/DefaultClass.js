import React, { Component } from "react";
import { connect } from "react-redux";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  render() {
    return <div>default Class</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
