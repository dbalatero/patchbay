import { combineReducers } from 'redux';
import PatchBayReducer from './patch_bay_reducer';

const rootReducer = combineReducers({
  patchBay: PatchBayReducer
});

export default rootReducer;
