import { FC, useState } from "react";
import parse from 'html-react-parser';
import { convertTableToObject } from "../detectTables"
import { Table } from "./Table/Table"
import { ToggleTableButton } from "./ToggleTableButton";


type TableWrapperProps = {
  table: HTMLTableElement
}

export const TableWrapper: FC<TableWrapperProps> = ({ table }) => {
  const [replaceTable, setReplaceTable] = useState(false)
  const originalTable = tableDomToJSX(table)
  const tableObject = convertTableToObject(table)

  return (
    <>
      <ToggleTableButton setReplaceTable={setReplaceTable}/>
      {!replaceTable &&  originalTable }
      <Table
        tableObject={tableObject}
        replaceTable={replaceTable}
      />
    </>
  )
}

const tableDomToJSX = (table: HTMLTableElement) => {
  const clonedTable = table.cloneNode(true);
  const dummyWrapper = document.createElement("div");
  dummyWrapper.appendChild(clonedTable);
  return parse(dummyWrapper.innerHTML)
}
