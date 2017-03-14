import { Record, List, Map, OrderedMap } from 'immutable';

const PatchBayLabel = Record({
  width: 1,
  value: '',
}, 'PatchBayLabel');

const JackGroup = Record({
  jacks: List(),
}, 'JackGroup');

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
}, 'PatchBayRecord');

const ConfigurationRecord = Record({
  patchBays: OrderedMap(),
}, 'ConfigurationRecord');

export default {
  ConfigurationRecord,
  PatchBayLabel,
  PatchBayRecord,
  JackGroup,
};
