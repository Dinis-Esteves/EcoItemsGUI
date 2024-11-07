import json
import csv

def json_to_csv(input_file, output_file):
    # Read JSON data from the input file
    with open(input_file, 'r', encoding='utf-8') as jsonfile:
        json_data = json.load(jsonfile)

    # Open the output CSV file for writing
    with open(output_file, mode='w', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        
        # Write the header
        csv_writer.writerow(['Id', 'Name'])
        
        # Iterate over the JSON keys
        for key in json_data.keys():
            if key:  # Skip empty keys
                # Write each key to the CSV
                csv_writer.writerow([key, key])

# Specify the input and output file names
input_file = 'mutators-args.json'  # Replace with your JSON file path
output_file = 'mutators.csv'  # Replace with your desired output CSV file path

# Call the function to convert JSON to CSV
json_to_csv(input_file, output_file)

print(f'CSV file "{output_file}" has been created successfully from "{input_file}".')
