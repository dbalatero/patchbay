import { Record, List, Map, OrderedMap } from 'immutable';

const PatchBayLabel = Record({
  id: null,
  backgroundColor: '#ffffff',
  header: '',
  jackIndex: 0,
  jackWidth: 1,
  jackLabels: List(['L']),
}, 'PatchBayLabel');

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
  outputs: List(),
  inputs: List(),
}, 'PatchBayRecord');

const ConfigurationRecord = Record({
  id: null,
  patchBays: OrderedMap(),
}, 'ConfigurationRecord');

export default {
  ConfigurationRecord,
  PatchBayLabel,
  PatchBayRecord,
};
