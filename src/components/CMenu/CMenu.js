import { each, filter, map } from 'lodash';
import Element from '../Element';
import '../../style/components/_menu.scss';

export default {
  extends: Element,
  computed: {
    autoGenerate() {
      return this.config.autoGenerate;
    },
    height() {
      return this.isFixed ? '100%' : this.config.height;
    },
    isFixed() {
      return this.config.main;
    },
    isMini() {
      return this.config.layout === 'mini';
    },
    isLeft() {
      return !this.isRight;
    },
    isRight() {
      return this.config.position === 'right';
    },
    positionType() {
      return this.config.positionType;
    },
  },
  methods: {
    getNavigationProps() {
      return {
        key: this.schema.uid,
        class: this.getBindingValue(this.config.color),
        props: {
          absolute: this.config.absolute,
          app: this.config.main,
          dark: this.isThemeDark,
          disableRouteWatcher: true,
          fixed: this.isFixed,
          height: this.height,
          left: this.isLeft,
          light: this.isThemeLight,
          miniVariant: this.isMini,
          permanent: this.config.permanent,
          right: this.isRight,
          value: this.config.isVisible,
          width: this.config.width,
        },
      };
    },
    selectItem(item) {
      this.sendToEventBus('SelectedItemChanged', item);
    },
    setItems() {
      const pages = this.getBindingValue('=$app.pages');
      const items = filter(pages, 'showInMenu');
      this.items = map(items, page => ({
        icon: page.icon,
        label: page.meta.title,
        path: page.path,
      }));
    },
    renderDivider() {
      return this.$createElement(
        'v-divider',
        {
          props: {
            dark: this.isThemeDark,
            light: this.isThemeLight,
          },
        },
      );
    },
    renderList() {
      const context = this;
      const listItems = [];

      each(this.items, (item) => {
        let listItemChildren;

        /*
        Here we have different elements depending on mini flag.
        This is to accomodate custom mini Ride design.
        */
        if (this.isMini) {
          listItemChildren = [
            this.$createElement(
              'div',
              {
                class: 'menu-item-link',
              },
              [
                this.$createElement('v-icon', item.icon),
                this.$createElement('div', { class: 'menu-item-label' }, item.label),
              ],
            ),
          ];
        } else {
          listItemChildren = [
            this.$createElement('v-list-item-action', [
              this.$createElement('v-icon', item.icon),
            ]),
            this.$createElement('v-list-item-content', [
              this.$createElement('v-list-item-title', item.label),
            ]),
          ];
        }

        const listItem = this.$createElement(
          'v-list-item',
          {
            class: 'menu-item',
            on: {
              click() {
                context.$router.push(item.path);
                context.selectItem(item);
              },
            },
          },
          listItemChildren,
        );

        listItems.push(listItem);
      });

      const list = this.$createElement('v-list', {
        props: {
          dense: false,
        },
      }, listItems);

      return list;
    },
    renderTitle() {
      const title = [];

      if (this.config.logo) {
        // TODO: Support once we have assets
        title.push();
      } else {
        title.push(
          this.$createElement(
            'v-icon',
            {
              class: 'menu-title-icon mb-1',
              props: {
                large: true,
              },
            },
            this.config.icon || 'explore',
          ),
        );
      }

      if (this.config.title) {
        title.push(
          this.$createElement(
            'div',
            {
              class: 'menu-title-label',
            },
            this.config.title,
          ),
        );
      }

      return this.$createElement(
        'v-list',
        {
          class: 'menu-title',
        },
        [
          this.$createElement('v-list-item', title),
          this.renderDivider(),
        ],
      );
    },
  },
  watch: {
    dataSource() {
      if (!this.config.autoGenerate) {
        this.loadData();
      }
    },
    autoGenerate(val) {
      if (val) this.setItems();
    },
  },
  render(createElement) {
    const children = [
      this.renderTitle(),
      this.renderList(),
      createElement('v-spacer'),
    ];
    return this.renderElement(
      'v-navigation-drawer',
      this.getNavigationProps(),
      children,
    );
  },
};
