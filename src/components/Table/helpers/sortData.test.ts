import { sortData } from "./sortData";

describe("sortData", () => {
  it('should sort data in ascending order when sortDirection is "asc"', () => {
    const data = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const sortedData = sortData(data, "name", "asc");
    expect(sortedData).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it('should sort data in descending order when sortDirection is "desc"', () => {
    const data = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const sortedData = sortData(data, "name", "desc");
    expect(sortedData).toEqual([
      { id: 3, name: "Charlie" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice" },
    ]);
  });

  it("should return the original data when sortColumn is null", () => {
    const data = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const sortedData = sortData(data, null, "asc");
    expect(sortedData).toEqual(data);
  });
});
