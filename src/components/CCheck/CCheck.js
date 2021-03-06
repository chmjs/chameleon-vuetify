import { fieldable, validatable } from '@/mixins';
import { validator } from '@/validators';
import Element from '../Element';


const getAttrs = (context) => {
  const { config } = context;

  const attrs = {
    name: config.name,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.value = value;
      const label = self.value ? context.config.label : '';
      self.sendToEventBus('Changed', { label });
      self.$emit('input', value);
    },
  };

  return listeners;
};

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getProps = (context) => {
  const { config } = context;

  const props = {
    appendIcon: config.appendIcon,
    hint: config.hint,
    label: config.label,
    persistentHint: config.persistentHint,
    placeholder: config.placeholder,
    prependIcon: config.prependIcon,
    disabled: config.disabled,
    color: config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    inputValue: context.value || false,
    value: config.value || false,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
  };

  return props;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  render(createElement) {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    return this.renderElement('div', {}, [
      createElement('v-checkbox', data),
    ]);
  },
};
