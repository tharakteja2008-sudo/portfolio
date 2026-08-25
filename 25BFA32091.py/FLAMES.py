name1 = input("Enter first name: ").replace(" ", "").lower()
name2 = input("Enter second name: ").replace(" ", "").lower()

# Convert names into lists
a = list(name1)
b = list(name2)

# Remove common letters
for ch in name1:
    if ch in b:
        a.remove(ch)
        b.remove(ch)

# Count remaining letters
count = len(a) + len(b)

# FLAMES
flames = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"]
while len(flames) > 1:
    index = (count - 1) % len(flames)
    flames.pop(index)

    # Rotate the list
    flames = flames[index:] + flames[:index]

print("FLAMES Result:", flames[0])
print(len(flames))