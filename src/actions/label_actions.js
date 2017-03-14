function addLabel(options) {
  return {
    type: 'ADD_LABEL_TO_PATCH_BAY',
    bay: options.bay,
    jackType: options.jackType,
    jackIndex: options.jackIndex,
  };
}

export default {
  addLabel,
};
