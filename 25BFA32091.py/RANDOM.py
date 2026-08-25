import random as r
#a = random.randint(1,10000)
print(r.randbytes(4),r.randint(200,300),r.randint(350,450))
l = [1,2,3,4,5,6,7]
print(r.choice(l))
print(r.choices(l,k=3))
print(r.sample(l,k=2))
print(r.random())
print(r.randrange(1,9))
r.shuffle(l)
print(l)
print(r.uniform(1,7))
