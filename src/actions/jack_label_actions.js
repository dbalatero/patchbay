function jackLabelEdited(options) {
  return {
    type: 'JACK_LABEL_EDITED',
    bay: options.bay,
    jackType: options.jackType,
    jackIndex: options.jackIndex,
    value: options.value,
  };
}

export default {
  jackLabelEdited,
};
