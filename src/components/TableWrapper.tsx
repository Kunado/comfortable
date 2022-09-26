import { FC, useState } from "react";
import parse from 'html-react-parser';
import { convertTableToObject } from "../detectTables"
import { Table } from "./Table/Table"
import { WrapperHeader } from "./WrapperHeader";
import { css } from "@emotion/css";
import { StyleProps } from "./util"

type TableWrapperProps = {
  table: HTMLTableElement
}

export const TableWrapper: FC<TableWrapperProps> = ({ table }) => {
  const [replaceTable, setReplaceTable] = useState(false)
  const OriginalTable: FC<StyleProps> = () => {
    return (
      <div className={tableStyle}>
        { tableDomToJSX(table) }
      </div>
    )
  }
  const tableObject = convertTableToObject(table)

  return (
    <div className={wrapperStyle}>
    <WrapperHeader setReplaceTable={setReplaceTable} />
      {!replaceTable &&  (<OriginalTable/>) }
      <Table
        tableObject={tableObject}
        replaceTable={replaceTable}
      />
    </div>
  )
}

const tableDomToJSX = (table: HTMLTableElement) => {
  const clonedTable = table.cloneNode(true);
  const dummyWrapper = document.createElement("div");
  dummyWrapper.appendChild(clonedTable);
  return parse(dummyWrapper.innerHTML)
}

const tableStyle = css`
  table {
    margin: 0;
  }
`

const wrapperStyle = css({
  border: "1px solid #888",
  borderRadius: "5px",
  padding: "0 10px 10px 10px",
  margin: "10px 0"
})
