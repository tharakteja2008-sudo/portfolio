import pandas as pd
data = [
    ["Ravi", 20, 85],
    ["Teja", 21, 90],
    ["Harika", 20, 95]
]

df = pd.DataFrame(data, rows=["Name", "Age", "Marks"])

print(df)