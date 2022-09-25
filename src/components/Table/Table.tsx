import { TableObject } from "../../detectTables";
import { FC, useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { SortOption, SortOrderOption, newSortOption, sortRowsBySortOption } from "../../tableSorter";
import { css } from "@emotion/css";

type TableProps = {
  tableObject: TableObject,
  replaceTable: boolean
}

export const Table: FC<TableProps> = ({ tableObject, replaceTable }) => {
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

  return (
    <table className={tableVisibilityStyle(replaceTable)}>
      <thead>
        <TableHeader
          header={tableObject.header}
          resorter={resorter}
          sortOption={sortOption}
        />
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

const tableVisibilityStyle = (replaceTable: boolean) => css(`
  ${!replaceTable && `display: none`}
`)
