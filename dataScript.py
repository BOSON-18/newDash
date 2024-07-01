import csv
from datetime import datetime, timedelta
import random

# Define employee divisions, sections, and reader types
divisions = ["Human Resources", "Legal", "Product Management", "Services", "Training", "Engineering",
             "Research and Development", "Business Development", "Marketing", "Sales", "Support",
             "Accounting"]
sections = ["Music", "Clothing", "Toys", "Baby", "Home", "Outdoors", "Books", "Health", "Kids",
            "Beauty", "Sports", "Shoes", "Jewelry", "Industrial", "Grocery", "Games", "Electronics",
            "Automotive", "Movies", "Computers", "Garden"]
reader_types = ["IN", "OUT"]

# Generate 10,000 entries
num_entries = 10000
start_date = datetime(2023, 1, 1)
end_date = start_date + timedelta(days=500)  # 60 days range

with open('employee_swipes.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['E_DIVN_NAME', 'E_SECN_NAME', 'TIME_OF_SWIPE', 'READER_TYPE', 'CCNO', 'E_NAME', 'DATE_OF_SWIPE'])
    
    for _ in range(num_entries):
        division = random.choice(divisions)
        section = random.choice(sections)
        reader_type = random.choice(reader_types)
        swipe_time = datetime.strptime(f"{random.randint(7, 18):02d}:{random.randint(0, 59):02d}:00", "%H:%M:%S").time()
        swipe_date = start_date + timedelta(days=random.randint(0, 59))
        ccno = random.randint(1, 1000)
        employee_name = f"Employee_{random.randint(1, 10000)}"
        
        # Skip weekends (Saturdays and Sundays)
        if swipe_date.weekday() in [5, 6]:  # 5=Saturday, 6=Sunday
            continue
        
        writer.writerow([division, section, swipe_time.strftime("%H:%M:%S"), reader_type, ccno, employee_name, swipe_date.strftime("%Y-%m-%d")])
