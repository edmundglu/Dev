import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// use connect to use redux

//destructuring
export const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
//when you map through an array and output jsx, its a list and you need a unique key

Alert.propTypes = {
  alerts: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  //from the reducer
});
//mapping redux state to props in this component (array of alerts)
export default connect(mapStateToProps)(Alert);
