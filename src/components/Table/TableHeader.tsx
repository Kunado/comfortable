import { FC } from "react";
import { TableHeaderColumn } from "./TableHeaderColumn";
import { SortOption, SortOrderOption } from "../../tableSorter";

type TableHeaderProps = {
  header: string[],
  resorter: (columnIndex: number) => void,
  sortOption: SortOption<SortOrderOption> | null
}

export const TableHeader: FC<TableHeaderProps> = ({ header, resorter, sortOption }) => {
  return (
    <tr>
      {
        header.map((cell, i) => {
          return (
            <TableHeaderColumn
              cell={cell}
              index={i}
              resorter={resorter}
              sortOption={sortOption}
              key={i}
            />
          )
        })
      }
    </tr>
  )
}
