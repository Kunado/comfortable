import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Table } from "./components/Table/Table"

import {
  detectTables,
  convertTableToObject
} from './detectTables'

const tables = detectTables();

if (tables.length != 0) {
  tables.forEach((table) => {
    const tableObj = convertTableToObject(table);
    console.log(tableObj);

    const alternativeTable = document.createElement("div");
    table.replaceWith(alternativeTable);
    const root = createRoot(alternativeTable);

    root.render(
      <React.StrictMode>
        <Table tableObject={tableObj} />
      </React.StrictMode>
    )
  })
}
