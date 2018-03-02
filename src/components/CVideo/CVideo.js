import { isString, map } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';

const sourceTypes = {
  webm: 'video/webm',
  mp4: 'video/mp4',
  ogv: 'video/ogg',
};

const getAttrs = (definition) => {
  const attrs = {
    controls: definition.controls,
    loop: definition.repeat,
    muted: definition.muted,
    title: definition.label,
    width: '100%',
    height: '100%',
  };

  if (definition.autoplay) {
    attrs.autoplay = definition.autoplay;
  }

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {};

  if (!self.options.isPreviewMode) {
    listeners.click = () => {
      if (self.$refs.video.paused) {
        self.$refs.video.play();
      } else {
        self.$refs.video.pause();
      }
    };
  }

  return listeners;
};

const getSourceType = (source) => {
  const parts = source.split('.');
  const ext = parts.pop();

  return sourceTypes[ext];
};

const getSources = (createElement, context) => {
  const definition = context.definition;
  const srcValues = isString(definition.value) ? [definition.value] : definition.value;

  const sources = map(srcValues, (source) => {
    const el = createElement(
      'source',
      {
        attrs: {
          src: context.options.isPreviewMode ? null : source,
          type: getSourceType(source),
        },
      },
    );

    return el;
  });

  return sources;
};

const getStaticStyle = (definition) => {
  let height = 'auto';
  let paddingTop = 0;

  if (definition.aspectRatio !== 'auto') {
    height = 0;
    const ratioValue = definition.aspectRatio.split(':');
    paddingTop = `${(ratioValue[1] / ratioValue[0]) * 100}%`;
  }

  const style = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height,
    paddingTop,
  };

  return style;
};

export default {
  name: `${namespace}video`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: this.getSchemaAttributes(),
        staticClass: `${this.baseClass} ${this.$options.name}`,
        staticStyle: getStaticStyle(this.definition),
      },
      [
        createElement(
          'video',
          {
            attrs: getAttrs(this.definition),
            on: getListeners(this),
            ref: 'video',
            staticStyle: {
              position: this.definition.aspectRatio !== 'auto' ? 'absolute' : 'relative',
              top: 0,
              left: 0,
            },
          },
          getSources(createElement, this),
        ),
      ],
    );
  },
};
