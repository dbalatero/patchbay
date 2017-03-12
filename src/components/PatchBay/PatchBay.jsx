import React from 'react';
import _ from 'lodash';

import './PatchBay.scss';

function jacks(count) {
  return _.times(count, () => <div styleName="jack" />);
}

function labels(count, text) {
  return _.times(count, () => <div styleName="label">{ text }</div>);
}

function numbers(count) {
  return _.times(count, index => (
    <div styleName="label">
      <span styleName="number">{ index + 1 }</span>
    </div>
  ));
}

function PatchBay() {
  const jackCount = 24;

  return (
    <div styleName="patch-bay">
      <div styleName="row">
        { labels(jackCount, 'out') }
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

export default PatchBay;
