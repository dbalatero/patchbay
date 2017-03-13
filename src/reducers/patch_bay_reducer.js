import { createReducer } from 'redux-immutablejs';
import { List, Record } from 'immutable';

let bayId = 0;

const PatchBayRecord = Record({
  id: null,
  jackCount: 24,
  outputs: List(),
  inputs: List(),
});

function buildPatchBay(jackCount) {
  bayId += 1;

  return PatchBayRecord({
    id: bayId,
    jackCount,
  });
}

const initialState = {
  patchBays: [buildPatchBay(24), buildPatchBay(12)],
};

export default createReducer(
  initialState,
  {
  },
);
