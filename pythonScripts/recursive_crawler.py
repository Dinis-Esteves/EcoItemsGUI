from selenium import webdriver
import time
from selenium.webdriver.common.by import By

driver = webdriver.Edge()

def extract_indented_elements(url: str) -> dict:
    driver.get(url)
    time.sleep(1)  # Wait for the page to load

    # Find the code block element
    code_block = driver.find_element(By.CSS_SELECTOR, '.codeBlockLines_mRuA')

    # Extract the text content
    code_text = code_block.text

    # Split the text into lines
    code_lines = code_text.split('\n')

    # Initialize a flag to track when we are within the 'args' section
    within_args = False

    # Dictionary to hold the extracted elements
    extracted_elements = {}

    # Process each line to extract the relevant indented lines
    for line in code_lines:
        if 'args:' in line:
            within_args = True
        elif within_args and line.startswith('    '):  # Four spaces for indentation
            # Check if the next level of indentation is present and exclude '- id'
            if not line.startswith('        ') and '- id' not in line:  # Eight spaces for deeper indentation
                # Extract the attribute name and value
                parts = line.strip().split(':')
                if len(parts) == 2:
                    attribute_name = parts[0].strip()
                    value = parts[1].strip().split()[0] if parts[1].strip() else ''
                    # Determine the type of the value
                    if value.isdigit():
                        value_type = 'int'
                    elif value.replace('.', '', 1).isdigit():
                        value_type = 'float'
                    else:
                        value_type = 'str'
                    extracted_elements[attribute_name] = value_type
        elif within_args and not line.startswith('    '):
            within_args = False

    return extracted_elements

with open("mutators-links.txt", "r") as urls:
    with open("mutators-args.txt", "w") as file:
        for url in urls.readlines():
            args = extract_indented_elements(url)
            condition = driver.find_element(By.XPATH, '//*[@id="__docusaurus"]/div[2]/div/main/div/div/div/div/article/div/h1[1]/code')
            file.write(condition.text + "\n")
            file.write(str(args) + "\n\n")

            print("condition scan completed")

driver.quit()