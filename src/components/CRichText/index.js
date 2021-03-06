import RichText from './CRichText';

export default {
  install(Vue, options) {
    const name = `${options.namespace}rich-text`;

    Vue.component(name, {
      name,
      extends: RichText,
      namespace: options.namespace,
    });
  },
};
