"""
import pandas as pd 

table = pd.read_csv("items.csv")

table = table.drop('', axis=1)

table.to_csv("items.csv")

print(table)
"""

import os

with open("effects.txt", "r") as file:
    with open("temp.txt", "w") as output:

        data = file.readlines()

        for line in data:
            line = line.replace("\n", "")
            output.write(line + "," + line + "\n")
    

#os.replace("temp.txt", "effects.txt")