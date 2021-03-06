import Video from './CVideo';

export default {
  install(Vue, options) {
    const name = `${options.namespace}video`;

    Vue.component(name, {
      name,
      extends: Video,
      namespace: options.namespace,
    });
  },
};
