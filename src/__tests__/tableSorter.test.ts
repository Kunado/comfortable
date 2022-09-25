import { isSortOptionOfColumn, newSortOption, sortRowsBySortOption } from "../tableSorter";

describe("isSortOptionOfColumn", () => {
  describe("when sortOption whose columnIndex mathes function's columnIndex given", () => {
    test("it returns true", () => {
      const sortOption = {
        columnIndex: 0,
        order: "ASC"
      } as const;
      expect(true).toEqual(isSortOptionOfColumn<0>(sortOption, 0))
    })
  })
  describe("when sortOption whose columnIndex doesn't math function's columnIndex given", () => {
    test("it returns false", () => {
      const sortOption = {
        columnIndex: 1,
        order: "ASC"
      } as const;
      expect(false).toEqual(isSortOptionOfColumn<0>(sortOption, 0))
    })
  })
})

describe("newSortOption", () => {
  describe("when null as currentSortOption given", () => {
    test("it returns new sortOption whose order is ASC and columnIndex is given one", () => {
      const columnIndex = 0;
      const expected = {
        columnIndex: columnIndex,
        order: "ASC"
      }
      expect(expected).toEqual(newSortOption(null, columnIndex));
    })
  })

  describe("when currentSortOption and columnIndex given", () => {
    describe("when currentSortOption's columnIndex equals given one", () => {
      describe("when currentSortOption's order is ASC", () => {
        test("it returns new sortOption whose order is DESC and columnIndex is given one", () => {
          const columnIndex = 0;
          const expected = {
            columnIndex: columnIndex,
            order: "DESC"
          }
          const currentSortOption = {
            columnIndex: columnIndex,
            order: "ASC"
          } as const;
          expect(expected).toEqual(newSortOption(currentSortOption, columnIndex));
        })
      })

      describe("when currentSortOption's order is DESC", () => {
        test("it returns new sortOption whose order is ASC and columnIndex is given one", () => {
          const columnIndex = 0;
          const expected = {
            columnIndex: columnIndex,
            order: "ASC"
          }
          const currentSortOption = {
            columnIndex: columnIndex,
            order: "DESC"
          } as const;
          expect(expected).toEqual(newSortOption(currentSortOption, columnIndex));
        })
      })
    })

    describe("when currentSortOption's columnIndex doesn't equal given one", () => {
      test("it returns new sortOption whose order is ASC and columnIndex is given one", () => {
        const columnIndex = 0;
        const expected = {
          columnIndex: columnIndex,
          order: "ASC"
        }
        const currentSortOption = {
          columnIndex: 1,
          order: "ASC"
        } as const;
        expect(expected).toEqual(newSortOption(currentSortOption, columnIndex));
      })
    })
  })
})

describe("sortRowsBySortOption", () => {
  const tableRows = [
    ["1", "some string"],
    ["2", "another string"]
  ]
  describe("when sortOption whose order is ASC given", () => {
    describe("when sortOption's columnIndex is 0", () => {
      const expected = [
        ["1", "some string"],
        ["2", "another string"]
      ]
      const sortOption = {
        columnIndex: 0,
        order: "ASC"
      } as const;
      test("it returns reordered table object so that first column is ascending orderd", () => {
        expect(expected).toEqual(sortRowsBySortOption(sortOption, tableRows));
      })
    })
    describe("when sortOption's columnIndex is 1", () => {
      const expected = [
        ["2", "another string"],
        ["1", "some string"]
      ]
      const sortOption = {
        columnIndex: 1,
        order: "ASC"
      } as const;
      test("it returns reordered table object so that second column is ascending orderd", () => {
        expect(expected).toEqual(sortRowsBySortOption(sortOption, tableRows));
      })
    })
  })

  describe("when sortOption whose order is DESC given", () => {
    describe("when sortOption's columnIndex is 0", () => {
      const expected = [
        ["2", "another string"],
        ["1", "some string"]
      ]
      const sortOption = {
        columnIndex: 0,
        order: "DESC"
      } as const;
      test("it returns reordered table object so that first column is descending orderd", () => {
        expect(expected).toEqual(sortRowsBySortOption(sortOption, tableRows));
      })
    })
    describe("when sortOption's columnIndex is 1", () => {
      const expected = [
        ["1", "some string"],
        ["2", "another string"]
      ]
      const sortOption = {
        columnIndex: 1,
        order: "DESC"
      } as const;
      test("it returns reordered table object so that second column is descending orderd", () => {
        expect(expected).toEqual(sortRowsBySortOption(sortOption, tableRows));
      })
    })
  })
})
