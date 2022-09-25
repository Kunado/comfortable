import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TableWrapper } from "./components/TableWrapper"

import {
  detectTables,
} from './detectTables'

const tables = detectTables();

if (tables.length != 0) {
  tables.forEach((table) => {
    const tableWrapper = document.createElement("div");
    table.replaceWith(tableWrapper);
    const root = createRoot(tableWrapper);

    root.render(
      <React.StrictMode>
        <TableWrapper table={table} />
      </React.StrictMode>
    )
  })
}
