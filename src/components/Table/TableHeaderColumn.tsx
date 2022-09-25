import { FC } from "react";
import { SortOption, SortOrderOption } from "../../tableSorter";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

type TableHeaderColumnProps = {
  cell: string,
  index: number,
  resorter: (columnIndex: number) => void,
  sortOption: SortOption<SortOrderOption> | null
}

export const TableHeaderColumn: FC<TableHeaderColumnProps> = ({ cell, index, resorter, sortOption }) => {
  const handleClick = () => {
    resorter(index)
  }

  return (
    <th onClick={handleClick}>
      {cell}
      <SortOrderIndicator sortOption={sortOption} index={index}/>
    </th>
  )
}

type SortOrderIndicatorProps = {
  sortOption: SortOption<SortOrderOption> | null,
  index: number
}

const SortOrderIndicator: FC<SortOrderIndicatorProps> = ({ sortOption, index }) => {
  return (
    <>
      {
        (() => {
          if(sortOption?.columnIndex == index) {
            if (sortOption?.order == "ASC") {
              return <AiFillCaretDown />
            } else {
              return <AiFillCaretUp />
            }
          }
        })()
      }
    </>
  )
}
