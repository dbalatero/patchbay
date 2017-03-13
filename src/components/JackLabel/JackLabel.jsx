import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../PatchBay/PatchBay.scss';

function onFieldChange(jackIndex, onChange) {
  return (event) => {
    onChange(jackIndex, event.target.value);
  };
}

function JackLabel(props) {
  const onChange = onFieldChange(props.jackIndex, props.onChange);

  return (
    <div>
      <input
        styleName="label-input"
        type="text"
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
}

JackLabel.propTypes = {
  jackIndex: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  return {
    jackIndex: props.jackIndex,
    value: props.value,
  };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    onChange: props.onChange,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JackLabel);
