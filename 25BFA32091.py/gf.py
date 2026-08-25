import pandas as pd

data = pd.DataFrame({
    "Name": ["Teja", "Veda", "Raghu"],
    "Age": [20, 21, 22],
    "Marks": [85, 90, 75]
})

#df = pd.DataFrame(data)

print(data["Age"][0])