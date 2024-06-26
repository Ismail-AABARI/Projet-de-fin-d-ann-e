import requests
from bs4 import BeautifulSoup
import csv

url = "http://www.liscomputers.com/backaroo/Products/MS_56.html"

response = requests.get(url)

if response.status_code == 200:

    soup = BeautifulSoup(response.content, 'html.parser')

    ttc_elements = soup.find_all('td', class_='ttc')

    output_file = "Product.csv"
    
    with open(output_file, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        
        writer.writerow(["Product Name", "Supplier", "Category", "Quantity Per Unit", "Unit Price", 
                         "Units In Stock", "Units On Order", "Reorder Level", "Discontinued", "Total Sales"])
        
        for i in range(0, len(ttc_elements), 10):

            product_data = [element.text.strip() for element in ttc_elements[i:i+10]]
            
            writer.writerow(product_data)
    
