export default {
  group: 'widgets',
  type: 'table',
  name: 'Table',
  icon: 'grid_on',
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: 'white',
      priority: 1,
    },
    flat: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 2,
    },
    noDataText: {
      type: 'input',
      group: 'localization',
      name: 'No Data Text',
      value: null,
      priority: 3,
    },
    noResultsText: {
      type: 'input',
      group: 'localization',
      name: 'No Results Text',
      value: null,
      priority: 4,
    },
    rowsPerPageText: {
      type: 'input',
      group: 'localization',
      name: 'Rows Per Page Text',
      value: null,
      priority: 5,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 6,
    },
    rowsPerPageItems: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page Items',
      value: null,
      priority: 7,
    },
    rowsPerPage: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page',
      value: 5,
      priority: 8,
    },
    startPage: {
      type: 'input',
      group: 'data',
      name: 'Start With Page',
      value: 1,
      priority: 9,
    },
    sortBy: {
      type: 'input',
      group: 'data',
      name: 'Sort Items By',
      value: null,
      priority: 10,
    },
    sortDescending: {
      type: 'check',
      group: 'data',
      name: 'Sort Descending',
      value: false,
      priority: 11,
    },
  },
};
