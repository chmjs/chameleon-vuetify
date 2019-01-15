import {
  defaults,
  isNil,
  isString,
  map,
  merge,
  filter,
} from 'lodash';
import Element from '../Element';

require('../../style/components/_list.styl');

const getContainerClasses = (context) => {
  const config = context.config;
  const attrs = {
    transparent: true,
    fluid: config.fluid,
    wrap: true,
    container: true,
  };

  return attrs;
};

const getPropRowsPerPageItems = (value) => {
  if (isNil(value)) {
    return [5, 10, 15, 20];
  } else if (isString(value)) {
    if (value.indexOf(',') > -1) {
      return map(value.split(','), Number);
    }

    return [Number(value)];
  }

  return value;
};

const getProps = (context) => {
  const config = context.config;
  const dataSource = context.dataSource;
  const hasDataSource = !isNil(dataSource);

  const props = {
    rowsPerPageItems: getPropRowsPerPageItems(config.rowsPerPageItems),
    hideActions: config.hideActions,
    items: hasDataSource ? context.items : [],
    contentTag: 'v-layout',
    contentClass: 'ma-0',
  };

  const rowsPerPageText = context.localize(config.rowsPerPageText);
  const noResultsText = context.localize(config.noResultsText);
  const noDataText = context.localize(config.noDataText);

  if (rowsPerPageText) props.rowsPerPageText = rowsPerPageText;
  if (noResultsText) props.noResultsText = noResultsText;
  if (noDataText) props.noDataText = noDataText;
  if (context.isDataSourceRemoteValid) props.totalItems = context.totalItems;
  if (context.pagination) props.pagination = context.pagination;

  return props;
};

const getListAvatar = (createElement, item, context) => {
  if (!item.thumb && !item.icon) {
    return null;
  }
  const children = () => {
    if (item.thumb) {
      return createElement('img', {
        attrs: {
          src: item.thumb,
        },
      });
    }
    return createElement('v-icon', item.icon);
  };
  return createElement('v-list-tile-avatar', {
    props: {
      tile: !context.config.imageRadius,
    },
  }, [children()]);
};

const getChildrenItems = (createElement, context, props) => {
  const item = props.item;
  const mapProps = context.dataSource.schema ?
    filter(context.dataSource.schema, i => !isNil(i.mapName)) : {};
  const itemProps = Object.keys(item);
  const title = !mapProps.length ? item[itemProps[0]] : item.title;
  const description = !mapProps.length ? item[itemProps[1]] : item.description;

  return createElement('v-list-tile', {
    on: {
      click() {
        context.sendToEventBus('SelectedItemChanged', item);
      },
    },
  },
    [
      getListAvatar(createElement, item, context),
      createElement('v-list-tile-content', {
        class: { overflow: context.config.showOverflow },
      },
        [
          createElement('v-list-tile-title', {
            class: `c-list-title ${context.config.titleColor}`,
            style: {
              height: item.label ? 'inherit' : 0,
              borderRadius: context.config.titleRadius ? '5px' : 0,
            },
          }, item.label),
          createElement('v-list-tile-title', title),
          createElement('v-list-tile-sub-title', item.subtitle),
          createElement('v-list-tile-sub-title', {
            class: 'c-list-description',
          }, description),
        ]),
    ]);
};

const getCardSlot = (createElement, context) => {
  const getChildren = props => [
    createElement('v-list', {
      class: {
        [context.config.color]: true,
      },
    },
      [getChildrenItems(createElement, context, props)]),
  ];

  const slot = {
    item: props => createElement('v-flex', {
      attrs: {
        [`pa-${context.config.spacing}`]: true,
        [`xs${context.config.noOfRows}`]: true,
      },
    },
      [
        createElement('v-card', {
          style: {
            borderRadius: context.config.itemRadius ? '5px' : 0,
          },
          props: {
            flat: true,
          },
        }, getChildren(props)),
      ],
    ),
  };

  return slot;
};

const getClientPagination = (config, setPagination) => {
  const sort = () => {
    if (config.sortBy) {
      return config.sortBy.mapName ? config.sortBy.mapName : config.sortBy.name;
    }
    return config.sortBy;
  };
  return defaults(setPagination || {}, {
    rowsPerPage: config.rowsPerPage,
    sortBy: sort(),
    descending: config.sort ? config.sort === 'desc' : null,
    page: config.startPage,
  });
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    'update:pagination': (value) => {
      self.pagination = getClientPagination(self.config, value);
      self.loadData();
      self.sendToEventBus('PaginationChanged', value);
    },
  };

  return listeners;
};

const getListHeader = (createElement, context) => {
  let header = null;
  if (context.config.header) {
    header = createElement('v-label', {
      slot: 'header',
    }, context.config.header);
  }
  return header;
};

const getListComponent = (createElement, context) => createElement('v-data-iterator', {
  attrs: {
    wrap: true,
  },
  props: getProps(context),
  on: getListeners(context),
  scopedSlots: getCardSlot(createElement, context),
},
  [
    getListHeader(createElement, context),
  ]);

export default {
  extends: Element,
  data() {
    return {
      items: [],
      pagination: null,
      totalItems: null,
    };
  },
  methods: {
    loadData() {
      // Remove params set in SDK
      delete this.dataSourceParams.pagination;
      // Set server pagination
      this.dataSourceParams = merge(this.dataSourceParams, {
        pageSize: this.pagination.rowsPerPage,
        sort: this.pagination.descending ? 'desc' : 'asc',
        sortBy: this.pagination.sortBy ? this.pagination.sortBy.name : this.pagination.sortBy,
        currentPage: this.pagination.page,
      });
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.totalItems = result.pagination ? result.pagination.totalResults : 0;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    setRowsPerPage(context) {
      if (context.rows && this.pagination) {
        this.pagination.rowsPerPage = context.rows;
      }
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  mounted() {
    this.pagination = getClientPagination(this.config);
  },
  render(createElement) {
    const data = {
      class: getContainerClasses(this),
      props: {
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: this.config.flat,
      },
    };

    const list = getListComponent(createElement, this);

    return this.renderElement(
      'v-card',
      data,
      [list],
    );
  },
};
