import csv
import json

# Read data from JSON file
with open('table_data.json', 'r') as file:
    data = json.load(file)

# Write to CSV file
with open('triggers.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Id", "Name"])  # header row
    for item in data:
        name = item["column1"]
        writer.writerow([name, name])  # write the values

print("CSV file created: output.csv")
