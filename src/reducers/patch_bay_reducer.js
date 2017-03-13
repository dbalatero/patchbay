import { createReducer } from 'redux-immutablejs';
import { Record } from 'immutable';

let bayId = 0;

const PatchBayRecord = Record({
  id: null,
  jackCount: 24,
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
