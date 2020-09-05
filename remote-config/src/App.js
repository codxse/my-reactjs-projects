import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import { injectRemoteConfig } from "./reducer";
import { RemoteConfig } from "./RemoteConfig";

class App extends React.Component {

  componentDidMount() {
    RemoteConfig.instance.values.then((v) => {
      this.props.injectRemoteConfig(v);
    })
  }

  render() {
    return (
      <div className="App">
        <h1>title: {this.props.remoteConfig?.title}</h1>
        { this.props.remoteConfig?.showButton ? <button>Click me</button> : null }
        <h2>Loop: {this.props.remoteConfig?.loop}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  remoteConfig: state.remoteConfigReducer.remoteConfig,
});

// const mapDispatchToProps = (dispatch) => ({
//   injectRemoteConfig: () => dispatch(injectRemoteConfig()),
// });

export default connect(mapStateToProps, { injectRemoteConfig })(App);
