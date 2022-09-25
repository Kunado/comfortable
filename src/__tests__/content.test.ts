import { table } from "./fixtures/table";
import { headerlessTable }  from "./fixtures/headerlessTable";
import { detectTables, hasTableHeader, convertTableWithHeaderToObject, convertTableWithoutHeaderToObject } from "../detectTables";

describe("detectTables", () => {
  describe("when document which includes table element given", () => {
    test("it returns tables included in the document", () => {
      document.body.innerHTML = table;
      expect(1).toEqual(detectTables().length);
    })
  })
})

describe("hasTableHeader", () => {
  describe("when table with header given", () => {
    test("it returns true", () => {
      document.body.innerHTML = table;
      const tableElm = detectTables()[0];
      expect(true).toEqual(hasTableHeader(tableElm));
    })
  })

  describe("when headerless table given", () => {
    test("it returns false", () => {
      document.body.innerHTML = headerlessTable;
      const tableElm = detectTables()[0];
      expect(false).toEqual(hasTableHeader(tableElm));
    })
  })
})

describe("convertTableWithHeaderToObject", () => {
  test("it returns object which has table cell's values as its property", () => {
    document.body.innerHTML = table;
    const tableElm = detectTables()[0];
    const expected = {
      header: ["number column", "string column"],
      rows: [
        ["1", "some string"],
        ["2", "another string"],
      ]
    }
    expect(expected).toEqual(convertTableWithHeaderToObject(tableElm))
  })
})

describe("convertTableWithoutHeaderToObject", () => {
  test("it returns object which has table cell's values as its property", () => {
    document.body.innerHTML = headerlessTable;
    const tableElm = detectTables()[0];
    const expected = {
      header: ["col#1", "col#2"],
      rows: [
        ["1", "some string"],
        ["2", "another string"],
      ]
    }
    expect(expected).toEqual(convertTableWithoutHeaderToObject(tableElm))
  })
})
