import 'typed-query-selector'

export type TableObject = {
  header: string[],
  rows: string[][]
}

export const detectTables = () => document.querySelectorAll("table");

export const hasTableHeader = (table: HTMLTableElement) => table.querySelector("thead") != null

export const convertTableToObject = (table: HTMLTableElement) => {
  if(hasTableHeader(table)) {
    return convertTableWithHeaderToObject(table)
  } else {
    return convertTableWithoutHeaderToObject(table)
  }
}

export const convertTableWithHeaderToObject = (table: HTMLTableElement) => {
  const headerContent = parseHeaderContent(table);
  const rows = [...table.querySelectorAll("tbody tr")];
  const rowsContent = parseMultipleRowContent(rows);
  return {
    header: headerContent,
    rows: rowsContent
  }
}

export const convertTableWithoutHeaderToObject = (table: HTMLTableElement) => {
  const rows = [...table.querySelectorAll("tbody tr")];
  const rowsContent = parseMultipleRowContent(rows);
  const assumedHeader = createHeaderFromRows(rowsContent);
  return {
    header: assumedHeader,
    rows: rowsContent
  }
}

const createHeaderFromRows = (rowsContent: string[][]) => {
  const columnsCount = Math.max(...rowsContent.map(row => row.length));
  return [...Array(columnsCount).keys()].map(i => `col#${++i}`)
}

const parseMultipleRowContent = (rows: HTMLTableRowElement[]) => {
  return rows.map((row) => {
    return parseRowContent(row);
  })
}

const parseRowContent = (row: HTMLTableRowElement) => {
  const cells = [...row.querySelectorAll("td")];
  return cells.map((cell) => {
    return cell.innerHTML;
  })
}

const parseHeaderContent = (table: HTMLTableElement) => {
  const cells = [...table.querySelectorAll("thead th")];
  return cells.map((cell) => {
    return cell.innerHTML;
  })
}
