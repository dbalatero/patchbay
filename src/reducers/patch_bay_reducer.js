import { createReducer } from 'redux-immutablejs';
import { OrderedMap, List } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import _ from 'lodash';

import records from '../records/patch_bay_records';

let bayId = 0;

function buildPatchBay(jackCount) {
  bayId += 1;

  const bay = records.PatchBayRecord({
    id: bayId,
    jackCount,
  });

  const outputJacks = List(_.times(jackCount, () => records.PatchBayLabel()));
  const inputJacks = List(_.times(jackCount, () => records.PatchBayLabel()));

  return bay
    .setIn(['outputs', 'jacks'], outputJacks)
    .setIn(['inputs', 'jacks'], inputJacks);
}

const defaultBays = List([buildPatchBay(24), buildPatchBay(24)]);

const initialState = records.ConfigurationRecord({
  patchBays: OrderedMap(defaultBays.map(bay => [bay.id, bay])),
});

export default createReducer(
  initialState,
  {
    [REHYDRATE]: (state, action) => {
      if (action.payload.patchBay) {
        return action.payload.patchBay;
      }

      return state;
    },
    JACK_LABEL_EDITED: (state, action) => state.setIn(
      [
        'patchBays',
        action.bay.id,
        action.jackType,
        'jacks',
        action.jackIndex,
        'value',
      ],
      action.value,
    ),
  },
);
