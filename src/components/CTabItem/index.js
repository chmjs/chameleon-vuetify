import TabItem from './CTabItem';

export default {
  install(Vue, options) {
    const name = `${options.namespace}tab-item`;

    Vue.component(name, {
      name,
      extends: TabItem,
      namespace: options.namespace,
    });
  },
};
