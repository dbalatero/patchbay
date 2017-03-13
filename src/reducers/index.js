import { combineReducers } from 'redux-immutablejs';
import PatchBayReducer from './patch_bay_reducer';

const rootReducer = combineReducers({
  patchBay: PatchBayReducer,
});

export default rootReducer;
