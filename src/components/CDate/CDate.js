import _isNil from 'lodash/isNil';
import moment from 'moment';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getPropRequired = (definition) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getMenuProps = (context) => {
  const definition = context.definition;
  const width = '290px';

  const props = {
    lazy: false,
    transition: _isNil(definition.transition) ? 'scale-transition' : definition.transition,
    fullWidth: true,
    maxWidth: width,
    minWidth: width,
    closeOnContentClick: false,
  };

  return props;
};

const getTextAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    name: definition.name,
    title: definition.tooltip,
  };

  return attrs;
};

const getTextProps = (context) => {
  const definition = context.definition;

  const props = {
    readonly: true,
    clearable: _isNil(definition.clearable) ? true : definition.clearable,
    appendIcon: definition.appendIcon,
    prependIcon: _isNil(definition.prependIcon) ? 'event' : definition.prependIcon,
    label: definition.label,
    hint: definition.hint,
    persistentHint: true,
    placeholder: definition.placeholder,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
    value: context.formattedValue,
  };

  return props;
};

const getTextListeners = (context) => {
  const self = context;

  const listeners = {
    click() {
      self.isTimeVisible = false;
    },
  };

  return listeners;
};

const getDatePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    value: context.value,
  };

  return props;
};

const getDatePickerActionSlot = (createElement, context) => {
  const self = context;

  const slot = {
    default: () => createElement('v-card-actions', [
      createElement('v-spacer'),
      createElement('v-btn',
        {
          props: {
            flat: true,
            icon: true,
          },
          on: {
            click() {
              self.isTimeVisible = true;
            },
          },
        },
        [
          createElement('v-icon', 'access_time'),
        ]),
    ]),
  };

  return slot;
};

const getDatePickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = moment.utc(value).toISOString();
    },
  };

  return listeners;
};

const getTimePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    value: context.parsedTimeValue,
  };

  return props;
};

const getTimePickerActionSlot = (createElement, context) => {
  const self = context;

  const slot = {
    default: () => createElement('v-card-actions', [
      createElement('v-spacer'),
      createElement('v-btn',
        {
          props: {
            flat: true,
            icon: true,
          },
          on: {
            click() {
              self.isTimeVisible = false;
            },
          },
        },
        [
          createElement('v-icon', 'date_range'),
        ]),
    ]),
  };

  return slot;
};

const getTimePickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      const isPm = value.indexOf('pm') > -1;
      const hours = parseInt(value.substring(0, 1), 10) + (isPm ? 12 : 0);
      const minutes = parseInt(value.substring(2, 4), 10);
      const formattedValue = moment.utc(self.value).hours(hours).minutes(minutes).toISOString();

      if (self.value !== formattedValue) {
        self.value = formattedValue;
      }
    },
  };

  return listeners;
};

export default {
  name: 'c-date',
  mixins: [
    fieldable,
  ],
  data() {
    return {
      isTimeVisible: false,
    };
  },
  computed: {
    hasTimeComponent() {
      return this.definition.time && this.definition.time.enabled;
    },
    formattedValue() {
      if (this.value) {
        const format = this.definition.format || (this.hasTimeComponent ? 'LLL' : 'LL');
        const formattedValue = moment.utc(this.value).format(format);

        return formattedValue;
      }

      return null;
    },
    parsedTimeValue() {
      const value = this.value ? moment.utc(this.value) : moment.utc();
      const parsedValue = value.format('LT').replace(/\s/g, '').toLowerCase();

      return parsedValue;
    },
  },
  render(createElement) {
    const children = [
      createElement(
        'v-text-field',
        {
          slot: 'activator',
          attrs: getTextAttrs(this),
          props: getTextProps(this),
          on: getTextListeners(this),
        },
      ),
    ];

    if (this.hasTimeComponent && this.isTimeVisible) {
      children.push([
        createElement(
          'v-time-picker',
          {
            scopedSlots: getTimePickerActionSlot(createElement, this),
            props: getTimePickerProps(this),
            on: getTimePickerListeners(this),
          },
        ),
      ]);
    } else {
      children.push([
        createElement(
          'v-date-picker',
          {
            scopedSlots: this.hasTimeComponent && getDatePickerActionSlot(createElement, this),
            props: getDatePickerProps(this),
            on: getDatePickerListeners(this),
          },
        ),
      ]);
    }

    return createElement(
      'v-menu',
      {
        props: getMenuProps(this),
      },
      children,
    );
  },
};