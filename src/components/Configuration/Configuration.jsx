import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import PatchBay from '../PatchBay/PatchBay';

function Configuration(props) {
  return (
    <div className="configuration">
      { props.patchBays.map(bay => (
        <PatchBay key={`bay-${bay.get('id')}`} bay={bay} />
      )) }
    </div>
  );
}

Configuration.propTypes = {
  patchBays: ImmutablePropTypes.list.isRequired,
};

function mapStateToProps(state) {
  return {
    patchBays: state.getIn(['patchBay', 'patchBays']),
  };
}

export default connect(mapStateToProps)(Configuration);
