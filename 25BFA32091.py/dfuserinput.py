
import pandas as pd

name = input("Enter name: ")
ages = list(map(int, input("Enter ages: ").split(",")))
#age = int(input("Enter age: "))#
marks = list(map(int, input("ENTER MARKS:").split(",")))

data = {
    "Name": [name],
    "Age": [ages],
    "Marks": [marks]
}

df = pd.DataFrame(data)

print(df)