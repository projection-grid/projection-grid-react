/**
 *
 * @typedef ColumnConfig
 * @type {Object}
 * @property {string} name
 *    Name of the column.
 * @property {string} title
 *    The localized column title. The `name` will be used if `title` is omitted.
 * @property {jsx} cell
 *    The template to render a cell for the column.
 * @property {(string|PropertyCallback|PropertyConfig)} property
 *    The data property of the column. It defines how to get/set values with
 *    a data item. If it's omitted, will use the column `name` as the key path.
 *    It could be
 *
 *    * A key path string. E.g. 'Foo/Bar'.
 *    * A {@link PropertyCallback} function
 *    * A {@link PropertyConfig} object
 * @property {(boolean|number|OrderByKey)} sortable
 *    The ordering configuration. If it's omitted, the column is unsortable.
 *    It could be
 *
 *    * A boolean simply say the column is sortable or not.
 *    * A number, positive for ascending first, otherwise descending first.
 *    * A string, the key path of the sorting values.
 *    * A {@link PropertyGetter} to get the sorting values from data items.
 *      Only available for memory data source.
 *    * A detailed {@link SortableConfig} object
 * @property {jsx} head
 *    The template to be rendered in the column header. The `title` string
 *    will be rendered in the column header if `html` is omitted.
 * */

export const ColumnChooser = (plugin, props) => plugin('columnChooser', ['grid'], (grid) => {
  grid.set({ columns: props.columns });
});
