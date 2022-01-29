const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const sort = { ...sortColumn };
    if (sort.path === path) sort.order = sort.order === "asc" ? "desc" : "asc";
    else {
      sort.path = path;
      sort.order = "asc";
    }
    onSort(sort);
  };
  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return (
        <i style={{ verticalAlign: "bottom" }} className="fa fa-sort-asc" />
      );
    return <i className="fa fa-sort-desc" style={{ verticalAlign: "top" }} />;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;
