const initialState = {
  patchBays: []
};

function PatchBayReducer(state, action) {
  state = state ? state : initialState;

  switch (action.type) {
    default:
      return state;
  }
}

export default PatchBayReducer;
