from random import random
from pyphen import Pyphen


def get_words_number(n: int, var: int):
    number = n + int(var * random())
    if number > 0:
        return number
    return 1

def get_syllables(word: str):
    pyphen = Pyphen(lang="es")
    split_word = pyphen.inserted(word, hyphen="-")
    return split_word.split("-")
