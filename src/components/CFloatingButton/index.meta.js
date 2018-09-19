import { merge } from 'lodash';
import CButton from '../CButton/index.meta';

export default {
  group: 'actions',
  type: 'floating-button',
  name: 'Floating Button',
  icon: 'control_point',
  children: [
    'floating-button-item',
  ],
  actions: merge({}, CButton.actions),
  events: merge({}, CButton.events),
  options: {
    color: true,
    theme: true,
    itemsCount: {
      type: 'childrenCountInput',
      name: 'Number of Child Elements',
      value: '0',
      validation: {
        required: true,
        min: 0,
      },
      priority: 3,
    },
    openOnHover: {
      type: 'check',
      name: 'Open On Hover',
      value: true,
      priority: 4,
    },
    absolute: {
      type: 'check',
      name: 'Position The Element Absolutely',
      value: false,
      priority: 5,
    },
    fixed: {
      type: 'check',
      name: 'Position The Element Fixed',
      value: false,
      priority: 6,
    },
    direction: {
      type: 'select',
      name: 'Direction In Which Content Will Be Shown',
      value: 'top',
      items: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
        {
          name: 'Bottom',
          value: 'bottom',
        },
        {
          name: 'Top',
          value: 'top',
        },
      ],
      priority: 7,
    },
    align: {
      type: 'select',
      name: 'Alignment',
      value: 'bottom right',
      items: [
        {
          name: 'Bottom-Right',
          value: 'bottom right',
        },
        {
          name: 'Bottom-Left',
          value: 'bottom left',
        },
        {
          name: 'Top-Right',
          value: 'top right',
        },
        {
          name: 'Top-Left',
          value: 'top left',
        },
      ],
      priority: 9,
    },
    activator: merge(
      {
        type: 'group',
        group: 'activator',
      }, CButton.options, {
        block: false,
        displayAsIcon: {
          value: true,
        },
        icon: {
          value: 'add_circle',
        },
      },
    ),
  },
};
