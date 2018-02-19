import { version } from '../package.json';
import * as components from './components';

require('./style/main-lite.styl');

const Library = {
  install(Vue, options = {}) {
    if (this.installed) return;
    this.installed = true;

    if (options.components) {
      Object.keys(options.components).forEach((key) => {
        const component = options.components[key];
        Vue.use(component);
      });
    }
  },
};

function Chameleon(Vue, args) {
  Vue.use(Library, {
    components,
    ...args,
  });
}

Chameleon.version = version;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Chameleon);
}

export default Chameleon;