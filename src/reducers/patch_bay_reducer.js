import { createReducer } from 'redux-immutablejs';
import { Map, List, Record } from 'immutable';
import _ from 'lodash';

let bayId = 0;

const PatchBayLabel = Record({
  width: 1,
  value: '',
});

const PatchBayRecord = Record({
  id: null,
  jackCount: 24,
  stripHeight: Map({
    value: 5.22,
    unit: 'mm',
  }),
  jackWidth: Map({
    value: 17.5,
    unit: 'mm',
  }),
  outputs: Map({
    jacks: List(),
  }),
});

function buildPatchBay(jackCount) {
  bayId += 1;

  const bay = PatchBayRecord({
    id: bayId,
    jackCount,
  });

  const jacks = List(_.times(jackCount, () => PatchBayLabel()));

  return bay.setIn(['outputs', 'jacks'], jacks);
}

const initialState = {
  patchBays: [buildPatchBay(24), buildPatchBay(24)],
};

export default createReducer(
  initialState,
  {
  },
);
