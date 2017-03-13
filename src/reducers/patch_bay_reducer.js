import { createReducer } from 'redux-immutablejs';
import { OrderedMap, Map, List, Record } from 'immutable';
import _ from 'lodash';

let bayId = 0;

const PatchBayLabel = Record({
  width: 1,
  value: '',
});

const JackGroup = Record({
  jacks: List(),
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
  outputs: JackGroup(),
  inputs: JackGroup(),
});

const ConfigurationRecord = Record({
  patchBays: OrderedMap(),
});

function buildPatchBay(jackCount) {
  bayId += 1;

  const bay = PatchBayRecord({
    id: bayId,
    jackCount,
  });

  const outputJacks = List(_.times(jackCount, () => PatchBayLabel()));
  const inputJacks = List(_.times(jackCount, () => PatchBayLabel()));

  return bay
    .setIn(['outputs', 'jacks'], outputJacks)
    .setIn(['inputs', 'jacks'], inputJacks);
}

const defaultBays = List([buildPatchBay(24), buildPatchBay(24)]);

const initialState = ConfigurationRecord({
  patchBays: OrderedMap(defaultBays.map(bay => [bay.id, bay])),
});

export default createReducer(
  initialState,
  {
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
