numbers = [1, 2, 3, 4]

result = []

for x in numbers:
    result.append((lambda x: x + 1)(x))

print(result)