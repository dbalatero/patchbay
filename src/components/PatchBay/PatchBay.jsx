import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import JackLabel from '../JackLabel/JackLabel';
import './PatchBay.scss';

function jacks(count) {
  return _.times(count, index => (
    <div styleName="jack" key={`jack-${index}`} />
  ));
}

function jackLabels(bay, jackType) {
  const bayId = bay.get('id');

  return bay.getIn([jackType, 'jacks']).map((jack, index) => {
    const key = `bay-${bayId}-${jackType}-jack-${index}`;

    return (
      <div styleName="label" key={key}>
        <JackLabel bay={bay} jackType={jackType} jackIndex={index} />
      </div>
    );
  });
}

function labels(count, text) {
  const key = `label-${text}`;

  return _.times(count, index => (
    <div styleName="label" key={`${key}-${index}`}>{ text }</div>
  ));
}

function numbers(count) {
  return _.times(count, index => (
    <div styleName="label" key={`number-${index}`}>
      <span styleName="number">{ index + 1 }</span>
    </div>
  ));
}

function PatchBay(props) {
  const jackCount = props.bay.get('jackCount');

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
        { labels(jackCount, 'in') }
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
