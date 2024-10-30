import Papa from "papaparse";

class Toolbox {
  // Updated csvToMap to use a callback instead of returning a Promise
  public static csvToMap(csv: string, callback: (map: Map<string, string>) => void) {
    fetch(csv)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const map = new Map<string, string>();
            results.data.forEach((row) => {
              if (row.Name && row.Id) {
                map.set(row.Id, row.Name);
              }
            });
            callback(map); // Call the callback with the created map
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }
}

export default Toolbox;


