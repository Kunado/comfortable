import { FC } from "react";
import parse from "html-react-parser";

type TableRowProps = {
  row: string[]
}

export const TableRow: FC<TableRowProps> = ({ row }) => {
  return (
    <tr>
    {
      row.map((cell, i) => {
        const parsedCell = parse(cell)
        return (
          <td key={i}>{parsedCell}</td>
        )
      })
    }
    </tr>
  )
}

