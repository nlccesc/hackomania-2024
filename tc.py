posstatements = [
    "Hello I am feeling happy today",
    "I am feeling optimistic"
]

negstatements = [
    "I just got fired from my job",
    "I lost $5000 on crypto"
]

def update_posstatements(new_keywords):
    global posstatements

    posstatements.extend(new_keywords)
    posstatements = list(set(posstatements))

def update_negstatements(new_keywords):
    global negstatements

    negstatements.extend(new_keywords)
    negstatements = list(set(negstatements))