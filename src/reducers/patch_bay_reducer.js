import { createReducer } from 'redux-immutablejs';
import { OrderedMap, List } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import uuid from 'uuid/v4';

import records from '../records/patch_bay_records';

function buildPatchBay(jackCount) {
  const bay = records.PatchBayRecord({
    id: uuid(),
    jackCount,
  });

  return bay;
}

const defaultBays = List([buildPatchBay(12), buildPatchBay(12)]);

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
    ADD_LABEL_TO_PATCH_BAY: (state, action) => {
      const path = ['patchBays', action.bay.id, action.jackType];

      const newLabel = records.PatchBayLabel({
        id: uuid(),
        jackIndex: action.jackIndex,
      });

      return state.updateIn(path, labels => (
        labels
          .push(newLabel)
          .sortBy(label => label.jackIndex)
      ));
    },
  },
);
