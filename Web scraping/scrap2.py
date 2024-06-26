import requests
from bs4 import BeautifulSoup
import csv

url = "http://www.liscomputers.com/backaroo/Suppliers/MS_61.html"

response = requests.get(url)

if response.status_code == 200:

    soup = BeautifulSoup(response.content, 'html.parser')
    
    ttc_elements = soup.find_all('td', class_='ttc')
    
    output_file = "Supplier.csv"
    
    with open(output_file, "w", newline="", encoding="utf-8") as csvfile:

        writer = csv.writer(csvfile)
        
        writer.writerow(["Company Name", "Contact Name", "Contact Title", "Address", "Phone"])
        
        entry_data = []
        
        for i, element in enumerate(ttc_elements):

            entry_data.append(element.text.strip())
            
            if (i + 1) % 5 == 0:
                writer.writerow(entry_data)
                
                entry_data = []
    
    print(f"Données insérées avec succès dans le fichier : {output_file}")
else:
    print("La requête a échoué. Veuillez vérifier l'URL et réessayer.")
