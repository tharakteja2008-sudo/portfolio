numbers = [40, 10, 30, 20, 10]

print("Original list:", numbers)

# append()
numbers.append(50)
print("After append:", numbers)

# insert()
numbers.insert(1, 15)
print("After insert:", numbers)

# remove()
numbers.remove(10)
print("After remove:", numbers)

# pop()
numbers.pop()
print("After pop:", numbers)

# sort()
numbers.sort()
print("After sort:", numbers)

# reverse()
numbers.reverse()
print("After reverse:", numbers)

# count()
print("Count of 10:", numbers.count(numbers))

# index()
print("Index of 20:", numbers.index(20))