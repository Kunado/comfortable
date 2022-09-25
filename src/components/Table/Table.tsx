import { TableObject } from "../../detectTables";
import { FC, useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { SortOption, SortOrderOption, newSortOption, sortRowsBySortOption } from "../../tableSorter";

type TableProps = {
  tableObject: TableObject
}

export const Table: FC<TableProps> = ({ tableObject }) => {
  const initialRowData = Array.from(tableObject.rows)
  const [rowData, setRowData] = useState(initialRowData);
  const [sortOption, setSortOption] = useState<SortOption<SortOrderOption> | null>(null);

  const resorter = (columnIndex: number) => {
    setSortOption(newSortOption(sortOption, columnIndex))
  }

  useEffect(() => {
    const updatedSortOption = sortOption == null ? {
      columnIndex: 0,
      order: "ASC"
    } as const : sortOption
    const newRowData = sortRowsBySortOption(updatedSortOption, rowData)
    setRowData(newRowData)
  }, [sortOption])

  const tableHeaderProps = {
    header: tableObject.header,
    resorter: resorter,
    sortOption: sortOption
  }

  return (
    <table>
      <thead>
        { TableHeader(tableHeaderProps) }
      </thead>
      <tbody>
        {
          rowData.map((row, i) => {
            return (
              <TableRow row={row} key={i} />
            )
          })
        }
      </tbody>
    </table>
  )
}

