export default {
  group: 'inputs',
  type: 'select-list',
  name: 'Select List',
  icon: 'featured_play_list',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    label: {
      type: 'input',
      name: 'Select List Label',
      value: 'Select',
      priority: 1,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 3,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 4,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 5,
    },
    readonly: {
      type: 'check',
      name: 'Enable Readonly',
      value: false,
      priority: 7,
    },
    multiple: {
      type: 'check',
      name: 'Multiple Selections',
      value: true,
      priority: 6,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
    },
  },
};
