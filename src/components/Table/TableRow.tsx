import { FC } from "react";

type TableRowProps = {
  row: string[]
}

export const TableRow: FC<TableRowProps> = ({ row }) => {
  console.log(row)
  return (
    <tr>
    {
      row.map((cell, i) => {
        return (
          <td key={i}>{cell}</td>
        )
      })
    }
    </tr>
  )
}

