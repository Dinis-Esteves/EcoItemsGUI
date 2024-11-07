from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Edge() 

url = "https://plugins.auxilor.io/"

driver.get(url)

try:
    time.sleep(5)
    # Espera até que o botão de três traços esteja presente e visível
    menu_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, ".navbar__toggle.clean-btn"))
    )
    print("Botão de menu encontrado e clicado.")
    menu_button.click()

    # Espera até que o dropdown esteja visível
    menu_link = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'menu__list-item-collapsible')]//a[contains(text(), 'The effects system')]"))
    )
    print("Submenu The effects system found and clicked")
    menu_link.click()

    dropdown_filters = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'menu__list-item-collapsible')]//a[contains(text(), 'All Filters')]"))
    )
    print("Subsubmenu All filters Found and Clicked")
    dropdown_filters.click()

    filters = driver.find_elements(By.CLASS_NAME, "menu__link")

    print("writing all the links to all filters in the file filters-links.txt")
    with open("filters-links.txt", "w") as file:
        for filter in filters:
            href = filter.get_attribute("href")
            if href.startswith("https://plugins.auxilor.io/effects/all-filters/"):
                file.write(href + "\n")
except Exception as e:
    print(f"Erro: {e}")
finally:
    time.sleep(1)
    driver.quit()


