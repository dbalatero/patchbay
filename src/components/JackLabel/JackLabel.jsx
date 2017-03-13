import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import actions from '../../actions/jack_label_actions';

function onFieldChange(props) {
  return (event) => {
    props.jackLabelEdited({
      bay: props.bay,
      jackType: props.jackType,
      jackIndex: props.jackIndex,
      value: event.target.value,
    });
  };
}

function JackLabel(props) {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        onChange={onFieldChange(props)}
      />
    </div>
  );
}

JackLabel.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  bay: ImmutablePropTypes.record.isRequired,
  jackType: React.PropTypes.string.isRequired,
  jackIndex: React.PropTypes.number.isRequired,
  /* eslint-enable */
  value: React.PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  return {
    bay: props.bay,
    jackType: props.jackType,
    jackIndex: props.jackIndex,
    value: '1',
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JackLabel);
