import requests
from bs4 import BeautifulSoup
import csv

url = "http://www.liscomputers.com/backaroo/Customers/MS_58.html"

response = requests.get(url)
html_content = response.text

soup = BeautifulSoup(html_content, "html.parser")

elements_with_class = soup.find_all("td", class_="ttc")

columns = 10  
data = [elements_with_class[i:i+columns] for i in range(0, len(elements_with_class), columns)]

with open("output.csv", "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow(["Customer ID", "Company Name", "Contact Name", "Email Address", "Contact Title",
                     "Address", "Phone", "Fax", "Orders", "Product"])
    for row in data:
       
        row_data = [column.get_text(strip=True) for column in row]
        
        address = " ".join(row_data[5:8])
        
        del row_data[5:8]
        
        row_data.insert(5, address)
        
        writer.writerow(row_data)
