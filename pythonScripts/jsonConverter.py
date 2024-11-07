import json
import re

# File paths
input_file = 'mutators-args.txt'
output_file = 'mutators-args.json'

# Initialize an empty dictionary to store commands
commands = {}

# Read and parse the input file
with open(input_file, 'r') as file:
    current_command = None
    for line in file:
        line = line.strip()
        # Check if line defines a command
        if not line.startswith("{"):
            current_command = line
            commands[current_command] = {}
        # Check if line defines parameters for the current command
        elif current_command:
            params = eval(line)  # Convert string to dictionary
            commands[current_command].update(params)

# Write the commands dictionary to a JSON file
with open(output_file, 'w') as file:
    json.dump(commands, file, indent=4)

print(f"Commands successfully converted to {output_file}")
