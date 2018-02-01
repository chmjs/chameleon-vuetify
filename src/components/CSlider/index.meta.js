export default {
  group: 'inputs',
  type: 'slider',
  name: 'Slider',
  icon: 'settings_ethernet',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    label: {
      type: 'input',
      name: 'Slider Label',
      value: '',
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: '',
      priority: 2,
    },
    trackColor: {
      type: 'input',
      name: 'Track Color',
      value: '',
      priority: 3,
    },
    thumbColor: {
      type: 'input',
      name: 'Thumb Color',
      value: '',
      priority: 4,
    },
    thumbLabel: {
      type: 'check',
      name: 'Thumb Label',
      value: true,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: '',
      priority: 5,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 6,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 7,
    },
    step: {
      type: 'input',
      name: 'Step Value',
      value: 1,
      priority: 8,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
      min: {
        type: 'input',
        name: 'Min Value',
        value: null,
      },
      max: {
        type: 'input',
        name: 'Max Value',
        value: null,
      },
    },
  },
};
