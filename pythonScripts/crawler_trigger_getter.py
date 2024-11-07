from selenium import webdriver
import time
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Edge()

url = "https://plugins.auxilor.io/effects/all-triggers"
driver.get(url)

try:
    time.sleep(2)
    
    # Locate the table and rows
    table_rows = WebDriverWait(driver, 10).until(
        EC.visibility_of_all_elements_located((By.XPATH, "//table/tbody/tr"))
    )
    
    # Initialize an empty list to store row data
    table_data = []

    # Iterate over rows and extract each cell's text
    for row in table_rows:
        cells = row.find_elements(By.TAG_NAME, "td")
        row_data = {
            "column1": cells[0].text,
        }
        table_data.append(row_data)

    # Save data to JSON
    with open("table_data.json", "w") as json_file:
        json.dump(table_data, json_file, indent=4)

    print("Data saved to table_data.json")

finally:
    driver.quit()

