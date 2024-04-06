poskeywords = [
    "happy", "classy", "affectionate", "admirable",
    "clever", "enthusiastic", "nice", "friendly",
    "lovely", "lively", "intelligent"
    ]

negkeywords = [
    "abysmal", "adverse", "alarming", "atrocious",
    "awful", "appalling", "bad", "creep"
]

def update_negkeywords(new_keywords):
    global negkeywords

    negkeywords.extend(new_keywords)
    negkeywords = list(set(negkeywords))

def update_poskeywords(new_keywords):
    global poskeywords

    poskeywords.extend(new_keywords)
    poskeywords = list(set(poskeywords))

    

