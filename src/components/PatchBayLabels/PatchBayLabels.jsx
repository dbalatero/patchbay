import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';

import labelActions from '../../actions/label_actions';
import '../PatchBay/PatchBay.scss';

function EmptyPatchBayLabel(props) {
  return (
    <a tabIndex="0" styleName="empty-label-container" onClick={props.onClickHandler}>
      +
    </a>
  );
}

EmptyPatchBayLabel.propTypes = {
  onClickHandler: React.PropTypes.func.isRequired,
};

function PatchBayLabel(props) {
  return (
    <div styleName="label-container">
      <div styleName="label-header">
        { props.label.header }
      </div>

      <div styleName="jack-labels">
        { props.label.jackLabels.map((text, index) => {
          const key = `label-${props.label.id}-jack-${index}`;

          return (
            <div key={key} styleName="jack-label">{ text }</div>
          );
        }) }
      </div>
    </div>
  );
}

PatchBayLabel.propTypes = {
  label: ImmutablePropTypes.record.isRequired,
};

function makeEmptyPatchBayLabels(number, keyStart, onEmptyClick) {
  return _.times(number, (index) => {
    const jackIndex = index + keyStart;
    const key = `empty-label-${jackIndex}`;

    return (
      <EmptyPatchBayLabel key={key} onClickHandler={onEmptyClick(jackIndex)} />
    );
  });
}

function labelTags(options) {
  const { labels, jackCount, onEmptyClick } = options;

  let labelElements = [];
  let currentIndex = 0;

  labels.forEach((label) => {
    const difference = label.jackIndex - currentIndex;

    if (difference > 0) {
      labelElements = labelElements.concat(
        makeEmptyPatchBayLabels(difference, currentIndex, onEmptyClick));

      currentIndex += difference;
    }

    const key = `label-${label.id}`;
    labelElements.push(<PatchBayLabel key={key} label={label} />);

    currentIndex += 1;
  });

  const remainingEmptyRecords = jackCount - currentIndex;

  if (remainingEmptyRecords > 0) {
    labelElements = labelElements.concat(
      makeEmptyPatchBayLabels(remainingEmptyRecords, currentIndex, onEmptyClick));
  }

  return labelElements;
}

function addLabelForIndex(props) {
  return function addLabelWrapped(index) {
    return () => props.addLabel({
      bay: props.bay,
      jackType: props.jackType,
      jackIndex: index,
    });
  };
}

function PatchBayLabels(props) {
  const tagOptions = {
    labels: props.labels,
    jackCount: props.bay.jackCount,
    onEmptyClick: addLabelForIndex(props),
  };

  return (
    <div styleName="labels" data-type={props.jackType}>
      { labelTags(tagOptions) }
    </div>
  );
}

PatchBayLabels.propTypes = {
  bay: ImmutablePropTypes.record.isRequired,
  jackType: React.PropTypes.string.isRequired,
  labels: ImmutablePropTypes.list.isRequired,
};

function mapStateToProps(state, props) {
  const labels = state
    .getIn(['patchBay', 'patchBays', props.bay.id, props.jackType]);

  return { labels };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addLabel: labelActions.addLabel,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatchBayLabels);
