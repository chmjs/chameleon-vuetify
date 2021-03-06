import Flexgrid from './CFlexgrid';

export default {
  install(Vue, options) {
    const name = `${options.namespace}flexgrid`;

    Vue.component(name, {
      name,
      extends: Flexgrid,
      namespace: options.namespace,
    });
  },
};
