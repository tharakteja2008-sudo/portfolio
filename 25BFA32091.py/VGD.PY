import random as rd
choices = ["ROCK","PAPER","SCISSOR"]
ch = rd.choice(choices)
user = input("enter:").upper()
#print("You chose:", user)
#rprint("Computer chose:", ch)
if user == ch:
    print("ITS A TIE")
elif user == "ROCK" and ch == "SCISSOR":
    print("YOU WIN")
elif user == "PAPER" and ch == "ROCK":
    print("YOU WIN")
elif user == "SCISSOR" and ch == "PAPER":
    print("YOU WINr")
elif user in ch:
    print("YOU LOST")
else:
    print("INVALID")

  