import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import JackLabel from '../JackLabel/JackLabel';
import jackLabelActions from '../../actions/jack_label_actions';
import './PatchBay.scss';

function jacks(count) {
  return _.times(count, index => (
    <div styleName="jack" key={`jack-${index}`} />
  ));
}

function onJackLabelChange(bay, jackType) {
  return function wrappedOnJackLabelChange(jackIndex, value) {
    return jackLabelActions.jackLabelEdited({
      bay,
      jackType,
      jackIndex,
      value,
    });
  };
}

function jackLabels(bay, jackType) {
  const bayId = bay.id;

  return bay[jackType].jacks.map((jack, index) => {
    const key = `bay-${bayId}-${jackType}-jack-${index}`;
    const onChange = onJackLabelChange(bay, jackType);

    return (
      <div styleName="label" key={key}>
        <JackLabel onChange={onChange} jackIndex={index} value={jack.value} />
      </div>
    );
  });
}

function numbers(count) {
  return _.times(count, index => (
    <div styleName="label" key={`number-${index}`}>
      <span styleName="number">{ index + 1 }</span>
    </div>
  ));
}

function PatchBay(props) {
  const jackCount = props.bay.jackCount;

  return (
    <div styleName="patch-bay">
      <div styleName="row">
        { jackLabels(props.bay, 'outputs') }
      </div>

      <div styleName="row">
        { jacks(jackCount) }
      </div>

      <div styleName="row">
        { numbers(jackCount) }
      </div>

      <div styleName="row">
        { jacks(jackCount) }
      </div>

      <div styleName="row">
        { jackLabels(props.bay, 'inputs') }
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    bay: props.bay,
  };
}

PatchBay.propTypes = {
  bay: ImmutablePropTypes.record.isRequired,
};

export default connect(mapStateToProps)(PatchBay);
