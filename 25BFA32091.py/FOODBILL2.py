import random as r

a = input("ENTER NAME:")
a = a.split(",")

print(a[r.randint(0, len(a) - 1)])