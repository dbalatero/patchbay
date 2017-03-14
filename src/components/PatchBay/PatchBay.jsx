import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import PatchBayLabels from '../PatchBayLabels/PatchBayLabels';
import './PatchBay.scss';

function jacks(count) {
  return _.times(count, index => (
    <div styleName="jack" key={`jack-${index}`} />
  ));
}

function numbers(count) {
  return _.times(count, index => (
    <div styleName="number-label" key={`number-${index}`}>
      <span styleName="number">{ index + 1 }</span>
    </div>
  ));
}

function PatchBay(props) {
  const { bay } = props;
  const jackCount = bay.jackCount;

  return (
    <div styleName="patch-bay">
      <div styleName="row">
        <PatchBayLabels bay={bay} jackType="outputs" />
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
        <PatchBayLabels bay={bay} jackType="inputs" />
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
