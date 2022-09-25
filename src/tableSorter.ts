export type SortOrderOption = "ASC" | "DESC"

export type SortOption<T extends SortOrderOption> = {
  columnIndex: number,
  order: T
}

export type SortOptionOfColumn<T extends number, U extends SortOrderOption> = {
  columnIndex: T,
  order: U
}

export const sortRowsBySortOption = (sortOption: SortOption<SortOrderOption>, rowData: string[][]) => {
  const ascendingSorter = (columnIndex: number, a: string[], b: string[]) => a[columnIndex] < b[columnIndex] ? -1 : 1
  const descendingSorter = (columnIndex: number, a: string[], b: string[]) => ascendingSorter(columnIndex, a, b) * -1

  const sorted = Array.from(rowData).sort((a, b) => {
    if (sortOption.order == "ASC") {
      return ascendingSorter(sortOption.columnIndex, a, b)
    } else {
      return descendingSorter(sortOption.columnIndex, a, b)
    }
  })
  return sorted
}

export const newSortOption = (currentSortOption: SortOption<SortOrderOption> | null, columnIndex: number) => {
  if (isSortOptionOfColumn<typeof columnIndex>(currentSortOption, columnIndex)) {
    return newSortOptionOfColumn(columnIndex, reverseOrder(currentSortOption.order))
  } else {
    return newSortOptionOfColumn(columnIndex, "ASC")
  }
}

export const isSortOptionOfColumn = <T extends number>(sortOption: SortOption<SortOrderOption> | null, columnIndex: T): sortOption is SortOptionOfColumn<T, SortOrderOption> => {
  if (sortOption == null) {
    return false
  } else {
    return sortOption.columnIndex == columnIndex
  }
}

const newSortOptionOfColumn = <T extends number>(columnIndex: T, sortOrder: SortOrderOption): SortOptionOfColumn<T, SortOrderOption> => {
  return {
    columnIndex: columnIndex,
    order: sortOrder
  }
}

const reverseOrder = (sortOrder: SortOrderOption) => isASC(sortOrder) ? "DESC" : "ASC"

const isASC = (sortOrder: SortOrderOption): sortOrder is "ASC" => {
  return sortOrder == "ASC"
}
